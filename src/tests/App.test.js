import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Deve renderizar a home usando o endereço de url `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const tituloDaPagina = getByText('Pokédex');
    expect(tituloDaPagina).toBeInTheDocument();
    const endereco = history.location.pathname;
    expect(endereco).toBe('/');
  });

  it('Testa a existencia dos link Home, About, Favorite Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});
