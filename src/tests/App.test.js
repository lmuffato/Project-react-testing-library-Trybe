import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('test app.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('testa se a página principal renderiza com a url /', () => {
    const history = createMemoryHistory();
    const { getByText } = render(<Router history={ history }><App /></Router>);
    history.push('/');
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
    const path = history.location.pathname;
    expect(path).toBe('/');
  });
  it('testa o conjunto de links no topo da aplicação', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByRole('link', {
      name: 'Home',
    });
    const about = getByRole('link', {
      name: 'About',
    });
    const favPokemon = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemon).toBeInTheDocument();
  });
  it('testa se os links redirecionam a página corretamente', () => {
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(<Router history={ history }><App /></Router>);
    const home = getByRole('link', {
      name: 'Home',
    });
    const about = getByRole('link', {
      name: 'About',
    });
    const favPokemon = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(favPokemon);
    expect(history.location.pathname).toBe('/favorites');
    history.push('/paginaInexistente');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
