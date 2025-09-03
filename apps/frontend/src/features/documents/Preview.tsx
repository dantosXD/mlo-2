import React from "react";

interface PreviewProps {
  key: string;
  owner: string;
  checksum: string;
  status: string;
  templateId?: string;
  isCompliant?: boolean;
}

export const Preview: React.FC<PreviewProps> = (props) => {
  const { key, owner, checksum, status, templateId, isCompliant } = props;

  return (
    <div>
      <h3>Document Preview</h3>
      <ul>
        <li>Key: {key}</li>
        <li>Owner: {owner}</li>
        <li>Checksum: {checksum}</li>
        <li>Status: {status}</li>
        {templateId && <li>Template: {templateId}</li>}
        {typeof isCompliant === "boolean" && (
          <li>Compliance: {isCompliant ? "Compliant" : "Not compliant"}</li>
        )}
      </ul>
    </div>
  );
};
