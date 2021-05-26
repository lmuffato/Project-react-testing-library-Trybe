import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFount from '../components/NotFound';

describe('NotFound Component', () => {
  test('Heading is a h2 and de text is Page requested not found', () => {
    render(<NotFount />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found crying emoji/i,
    });
    expect(h2).toBeInTheDocument();
  });
});
