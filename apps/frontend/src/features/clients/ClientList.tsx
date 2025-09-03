import React, { useState } from 'react';
import ClientDetail from './ClientDetail';
import { formatSSN } from './ssn';

export interface Client {
  id: number;
  name: string;
  ssn: string;
  status: 'active' | 'inactive';
}

// Mock data for demonstration purposes
const clients: Client[] = [
  { id: 1, name: 'Alice Smith', ssn: '123-45-6789', status: 'active' },
  { id: 2, name: 'Bob Johnson', ssn: '987-65-4321', status: 'inactive' },
  { id: 3, name: 'Charlie Brown', ssn: '111-22-3333', status: 'active' },
];

interface Props {
  authorized?: boolean;
}

const ClientList: React.FC<Props> = ({ authorized = false }) => {
  const [selected, setSelected] = useState<Client | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2>Clients</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <ul>
        {filtered.map((client) => (
          <li key={client.id}>
            <button onClick={() => setSelected(client)}>{client.name}</button>
            {' '}
            <small>{formatSSN(client.ssn, authorized)}</small>
          </li>
        ))}
      </ul>
      {selected && (
        <ClientDetail client={selected} authorized={authorized} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default ClientList;
