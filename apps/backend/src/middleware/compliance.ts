import { Request, Response, NextFunction } from 'express';

// Simple TRID/HMDA/QM compliance checks
// This middleware expects loan application data on req.body
export function complianceChecks(req: Request, res: Response, next: NextFunction) {
  const { trid, hmda, qm } = checkCompliance(req.body);

  if (!trid.valid || !hmda.valid || !qm.valid) {
    return res.status(400).json({
      message: 'Compliance validation failed',
      details: { trid, hmda, qm }
    });
  }

  next();
}

interface CheckResult { valid: boolean; message?: string }

function checkCompliance(body: any) {
  const results = {
    trid: checkTRID(body),
    hmda: checkHMDA(body),
    qm: checkQM(body)
  };
  return results;
}

function checkTRID(body: any): CheckResult {
  if (!body.loanEstimate || !body.closingDisclosure) {
    return { valid: false, message: 'Missing TRID documents' };
  }
  return { valid: true };
}

function checkHMDA(body: any): CheckResult {
  if (!body.loanAmount || !body.propertyType) {
    return { valid: false, message: 'Missing HMDA fields' };
  }
  return { valid: true };
}

function checkQM(body: any): CheckResult {
  if (typeof body.dti !== 'number' || body.dti > 43) {
    return { valid: false, message: 'DTI exceeds QM threshold' };
  }
  return { valid: true };
}
