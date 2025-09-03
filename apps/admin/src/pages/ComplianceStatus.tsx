import React, { useEffect, useState } from 'react';

export default function ComplianceStatus() {
  const [status, setStatus] = useState<string>('checking');

  useEffect(() => {
    fetch('/api/compliance')
      .then((r) => r.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('unknown'));
  }, []);

  return (
    <div>
      <h1>Compliance Status</h1>
      <p>Current status: {status}</p>
    </div>
  );
}

