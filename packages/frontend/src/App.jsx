import React, { useState } from 'react';
import { Greeting } from './Greeting.jsx';

export function App() {
  const [name, setName] = useState('World');
  return (
    <>
      <input aria-label="name" value={name} onChange={e => setName(e.target.value)} />
      <Greeting name={name} />
    </>
  );
}
