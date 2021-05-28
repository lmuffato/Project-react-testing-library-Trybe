import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound test', () => {
  it('mostra um h2 com texto `Page requested not Found`', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading', {
      level: 2,
    });
    expect(h2).toBeInTheDocument();
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  it('mostra um gif do pikachu triste', () => {
    // Span/emoticon é uma imagem -_-
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getAllByRole('img')[1].src).toBe(url);
  });

  it('mostra 2 `img`', () => {
    // já que Span é img...
    const { getAllByRole } = renderWithRouter(<NotFound />);
    expect(getAllByRole('img').length).toBe(2);
  });
});
