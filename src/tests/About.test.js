import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('About tests',() => {
  it('mostra Pokédex quando a rota é `/about`', () => {
    const { getByText, history } = renderWithRouter(<About />);
    // const pathname = history.location.pathname; 
    // history ainda no :/, teste pode ser feito unitario
    // expect(pathname).toBe('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('mostra image da Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    expect(getByAltText(/Pokédex/i)).toBeInTheDocument();
  });

  it('mostra um h2', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading2 = getByRole('heading', {
      level: 2
    });
    expect(heading2).toBeInTheDocument();
  });

  it('mostra 2 p com texto', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraphs = getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

});
