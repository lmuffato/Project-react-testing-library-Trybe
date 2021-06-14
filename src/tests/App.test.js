import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

// Acessar os elementos da sua tela
// Interagir com eles (se houver necessidade)
// Fazer seu teste
describe('Testa links de navegação do componente App', () => {
  it('Testa se a URL / renderiza o componente Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const home = getByText(/Pokédex/);
    expect(home).toBeInTheDocument();
  });
  it('Testa se a URL /about renderiza o componente About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const about = getByText(/About Pokédex/);
    expect(about).toBeInTheDocument();
  });
  it('Testa se a URL /favorites renderiza o componente Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const about = getByText(/Favorite pokémons/);
    expect(about).toBeInTheDocument();
  });
});
