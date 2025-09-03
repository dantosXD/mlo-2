import { AuthenticatedRequest } from '../index';

interface Context {
  req: AuthenticatedRequest;
}

export function listDocuments(_parent: unknown, _args: unknown, context: Context) {
  const role = context.req.user?.role;
  if (role !== 'admin' && role !== 'user') {
    throw new Error('Forbidden');
  }
  // Placeholder: return empty list of documents
  return [];
}
