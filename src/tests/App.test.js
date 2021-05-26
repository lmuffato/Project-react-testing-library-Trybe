import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste about', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página principal da Pokédex é'
      + ' renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { history, getByRole } = renderWithRouter(
      <App />,
    );
    expect(history.location.pathname).toBe('/');
    expect(getByRole('heading', { name: /encountered pokémons/i })).toBeInTheDocument();
    expect(getByRole('link', {
      name: /home/i,
    })).toBeInTheDocument();
    expect(getByRole('link', {
      name: /about/i,
    })).toBeInTheDocument();
    expect(getByRole('link', {
      name: /favorite pokémons/i,
    })).toBeInTheDocument();
  });
});

// agradecimento ao colega Anderson Nascimento, Adelino Junior, Nathi zebral, Luciano Amâncio, Marilia
