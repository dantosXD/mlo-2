import { AuthenticatedRequest } from '../index';

interface Context {
  req: AuthenticatedRequest;
}

export function listClients(_parent: unknown, _args: unknown, context: Context) {
  if (context.req.user?.role !== 'admin') {
    throw new Error('Forbidden');
  }
  // Placeholder: return empty list of clients
  return [];
}
