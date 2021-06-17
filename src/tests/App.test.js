import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests the home page', () => {
  test('shows the Pokédex when the route is `/`', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('renders a heading with the text `Pokédex`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Verifica se há 3 links de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/^home$/i)).toBeInTheDocument();
    expect(screen.getByText(/^about$/i)).toBeInTheDocument();
    expect(screen.getByText(/^favorite pokémons$/i)).toBeInTheDocument();
  });

  test('deve renderizar o componente Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/^home$/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('deve renderizar o componente About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/^about$/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('deve renderizar o componente Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/^favorite pokémons$/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('deve testar um caminho não existente e a renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/^Page requested not found$/i);
    expect(noMatch).toBeInTheDocument();
  });
});
