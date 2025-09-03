import React, { useState } from "react";

export const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    // Placeholder for upload implementation
    console.log("Uploading", file.name);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit" disabled={!file}>
        Upload
      </button>
    </form>
  );
};
