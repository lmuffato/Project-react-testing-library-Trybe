import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Request 1: test component App', () => {
  // Renderiza um título com o texto Pokedex;
  it('renders a heading with the text `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: 'Pokédex',
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
});

// Renderiza no topo links fixos de navegação
describe('Renders fixed navigation links at the top', () => {
  it('renders fixed navigation link Home', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', {
      name: 'Home',
    });
    expect(home).toBeInTheDocument();
  });

  it('renders fixed navigation link About', () => {
    const { getByRole } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: 'About',
    });
    expect(about).toBeInTheDocument();
  });

  it('renders fixed navigation link Favorite', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favorite = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favorite).toBeInTheDocument();
  });
});

// Teste de rota;
describe('Test route', () => {
  // renderiza a página inicial ao clicar no link Home

  it('renders the home page by clicking on the Home link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', {
      name: 'Home',
    });
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    const textHome = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(textHome).toBeInTheDocument();
  });
  it('renders the about page by clicking on the About link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: 'About',
    });
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    const textAbout = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(textAbout).toBeInTheDocument();
  });
  it('renders the favorite page by clicking on the Favorite Pokémons link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favorite = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    const textFavorite = getByRole('heading', {
      name: 'Favorite pokémons',
      level: 2,
    });
    expect(textFavorite).toBeInTheDocument();
  });

  it('renders the not found page entering an unknown url', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/page/not-exist/');
    expect(getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    })).toBeInTheDocument();
  });
});
