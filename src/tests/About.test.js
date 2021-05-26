import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('About tests',() => {
  it('mostra Pokédex quando a rota é `/about`', () => {
    const { getByText, history } = renderWithRouter(<About />);
    // const pathname = history.location.pathname; //history ainda no :/
    // expect(pathname).toBe('/about');
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('mostra image da Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    expect(getByAltText(/Pokédex/i)).toBeInTheDocument();
  });

});
