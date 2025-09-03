import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from './App.jsx';

describe('App integration', () => {
  it('updates greeting when name changes', () => {
    render(<App />);
    const input = screen.getByLabelText('name');
    fireEvent.change(input, { target: { value: 'Vitest' } });
    expect(screen.getByText('Hello Vitest')).toBeInTheDocument();
  });
});
