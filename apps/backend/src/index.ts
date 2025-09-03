import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

// JWT verification middleware
export function verifyJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const auth = req.headers['authorization'];
  if (!auth) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string; role: string };
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.use(verifyJWT);

export default app;
