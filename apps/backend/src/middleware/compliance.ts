import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

/**
 * Middleware that enforces compliance requirements and records
 * each request in the audit_log table.
 */
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function complianceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // basic compliance check
  const user: any = (req as any).user;
  if (user && user.compliance === false) {
    res.status(403).json({ error: 'User not compliant' });
    return;
  }

  const start = Date.now();
  res.on('finish', async () => {
    try {
      const duration = Date.now() - start;
      await pool.query(
        'insert into audit_log(actor, action, entity, details) values ($1, $2, $3, $4)',
        [user?.id || 'anonymous', req.method, req.originalUrl, { status: res.statusCode, duration }]
      );
    } catch (err) {
      console.error('failed to write audit log', err);
    }
  });

  next();
}

