import React from 'react';
import { Client } from './ClientList';
import { formatSSN } from './ssn';

interface Props {
  client: Client;
  authorized?: boolean;
  onClose: () => void;
}

const ClientDetail: React.FC<Props> = ({ client, authorized = false, onClose }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h3>Client Detail</h3>
      <p><strong>Name:</strong> {client.name}</p>
      <p><strong>Status:</strong> {client.status}</p>
      <p><strong>SSN:</strong> {formatSSN(client.ssn, authorized)}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ClientDetail;
