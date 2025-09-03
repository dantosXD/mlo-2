import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Greeting } from './Greeting.jsx';

describe('Greeting', () => {
  it('renders greeting with name', () => {
    render(<Greeting name="World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
