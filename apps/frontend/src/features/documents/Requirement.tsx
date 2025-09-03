import React from "react";

interface RequirementProps {
  isRequired: boolean;
  isCompliant?: boolean;
}

export const Requirement: React.FC<RequirementProps> = ({ isRequired, isCompliant }) => {
  if (!isRequired) {
    return <p>No document required.</p>;
  }
  return (
    <p>
      Document is required and{typeof isCompliant === "boolean" ? (isCompliant ? " compliant." : " not compliant.") : " pending review."}
    </p>
  );
};
