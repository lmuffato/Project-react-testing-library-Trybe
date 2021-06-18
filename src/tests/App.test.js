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

    expect(getByRole(linkHome)).toBeInTheDocument();
    expect(getByRole(linkAbout)).toBeInTheDocument();
    expect(getByRole(linkFavorite)).toBeInTheDocument();
  });

  it('Teste o redirecionamento dos links em App', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: /home/i });
    const linkAbout = getByRole('link', { name: /about/i });
    const linkFavorite = getByRole('link', { name: /favorite pokémons/i });

    fireEvent.click(linkHome);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    expect(pathname).toBe('/');

    fireEvent.click(linkAbout);
    expect(getByText('About Pokédex')).toBeInTheDocument();
    expect(pathname).toBe('/about');

    fireEvent.click(linkFavorite);
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
    expect(pathname).toBe('/favorite');
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
