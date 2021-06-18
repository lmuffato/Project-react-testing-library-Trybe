import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../Render/renderWithRouter';

describe('testes do componente App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém 3 links de navegação.', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByRole('link', { name: /home/i });
    const linkAbout = getByRole('link', { name: /about/i });
    const linkFavorite = getByRole('link', { name: /favorite pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Teste o redirecionamento dos links em App', () => {
    const { getByText } = renderWithRouter(<App />);
    // const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const linkHome = getByText(/home/i);
    const linkAbout = getByText(/about/i);
    const linkFavorite = getByText(/favorite pokémons/i);

    fireEvent.click(linkHome);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    // expect(pathname).toBe('/');

    fireEvent.click(linkAbout);
    expect(getByText('About Pokédex')).toBeInTheDocument();
    // expect(pathname).toBe('/about');

    fireEvent.click(linkFavorite);
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
    // expect(pathname).toBe('/favorites');
  });

  it('Teste com URL desconhecida', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/teste'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
