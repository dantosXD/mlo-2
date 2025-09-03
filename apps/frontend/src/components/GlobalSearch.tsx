import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Chip, TextField, Box } from '@mui/material';

// GraphQL query hitting the backend search endpoint
const SEARCH = gql`
  query Search($term: String!) {
    search(term: $term) {
      __typename
      ... on Client { id name }
      ... on Loan { id title }
      ... on Document { id title }
    }
  }
`;

const FILTERS = [
  { key: 'Client', label: 'Clients' },
  { key: 'Loan', label: 'Loans' },
  { key: 'Document', label: 'Documents' },
];

export default function GlobalSearch() {
  const [term, setTerm] = useState('');
  const [active, setActive] = useState<string[]>(FILTERS.map(f => f.key));
  const [runSearch, { data }] = useLazyQuery(SEARCH);

  const toggle = (key: string) => {
    setActive((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    runSearch({ variables: { term: value } });
  };

  const results = (data?.search ?? []).filter((r: any) =>
    active.includes(r.__typename),
  );

  return (
    <Box>
      <TextField fullWidth placeholder="Search" value={term} onChange={onChange} />
      <Box sx={{ mt: 1 }}>
        {FILTERS.map(({ key, label }) => (
          <Chip
            key={key}
            label={label}
            color={active.includes(key) ? 'primary' : 'default'}
            onClick={() => toggle(key)}
            sx={{ mr: 1 }}
          />
        ))}
      </Box>
      <ul>
        {results.map((r: any) => (
          <li key={`${r.__typename}-${r.id}`}>
            {r.__typename === 'Client' && r.name}
            {r.__typename !== 'Client' && r.title}
          </li>
        ))}
      </ul>
    </Box>
  );
}
