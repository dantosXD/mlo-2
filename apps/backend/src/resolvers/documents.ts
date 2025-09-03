export interface Document {
  key: string;
  owner: string;
  checksum: string;
  status: string;
  templateId?: string;
  isCompliant?: boolean;
}

// In-memory document store for example purposes
const documents: Record<string, Document> = {};

export const DocumentResolver = {
  Query: {
    documents: (): Document[] => Object.values(documents),
    document: (_: unknown, { key }: { key: string }): Document | null => documents[key] || null,
  },
  Mutation: {
    uploadDocument: (
      _: unknown,
      { key, owner, checksum, status }: Document
    ): Document => {
      const doc: Document = { key, owner, checksum, status };
      documents[key] = doc;
      return doc;
    },
    assignTemplate: (
      _: unknown,
      { key, templateId }: { key: string; templateId: string }
    ): Document | null => {
      const doc = documents[key];
      if (!doc) return null;
      doc.templateId = templateId;
      return doc;
    },
    markCompliance: (
      _: unknown,
      { key, isCompliant }: { key: string; isCompliant: boolean }
    ): Document | null => {
      const doc = documents[key];
      if (!doc) return null;
      doc.isCompliant = isCompliant;
      return doc;
    },
  },
};
