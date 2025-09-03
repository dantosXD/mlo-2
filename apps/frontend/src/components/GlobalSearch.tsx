import { useLazyQuery, gql } from '@apollo/client';
import React, { useState } from 'react';

const SEARCH_QUERY = gql`
  query GlobalSearch($term: String!) {
    search(term: $term) {
      __typename
      ... on Client { id name }
      ... on Loan { id description }
      ... on Document { id title }
    }
  }
`;

export default function GlobalSearch() {
  const [term, setTerm] = useState('');
  const [runSearch, { data }] = useLazyQuery(SEARCH_QUERY);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      runSearch({ variables: { term } });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={term}
          onChange={e => setTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {data?.search?.map((item: any) => (
          <li key={`${item.__typename}-${item.id}`}>
            {item.__typename === 'Client' && item.name}
            {item.__typename === 'Loan' && item.description}
            {item.__typename === 'Document' && item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
