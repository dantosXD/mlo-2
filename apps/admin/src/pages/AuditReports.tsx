import React, { useEffect, useState } from 'react';

interface LogEntry {
  id: string;
  actor: string;
  action: string;
  entity: string | null;
  created_at: string;
}

export default function AuditReports() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    fetch('/api/audit')
      .then((r) => r.json())
      .then(setLogs)
      .catch(() => setLogs([]));
  }, []);

  return (
    <div>
      <h1>Audit Reports</h1>
      <table>
        <thead>
          <tr>
            <th>Actor</th>
            <th>Action</th>
            <th>Entity</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td>{l.actor}</td>
              <td>{l.action}</td>
              <td>{l.entity}</td>
              <td>{new Date(l.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

