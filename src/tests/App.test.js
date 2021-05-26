import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('Testando se a página inicial é renderizada pela URL(/)', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/');

    const heading = getByRole('heading', {
      name: 'Pokédex',
      level: 1,
    });

    expect(heading).toBeInTheDocument();
    // screen.debug();
  });

  it('Testando se na página inicial é renderizado os links de navegação', () => {
    const { getByRole } = renderWithRouter(<App />);

    const homeTextLink = getByRole('link', {
      name: 'Home',
    });

    const aboutTextLink = getByRole('link', {
      name: 'About',
    });

    const favoriteTextLink = getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(homeTextLink).toBeInTheDocument();
    expect(aboutTextLink).toBeInTheDocument();
    expect(favoriteTextLink).toBeInTheDocument();
  });

  it('Testando se a aplicação é redirecionada para a página inicial', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/');

    const homeTextLink = getByRole('link', {
      name: 'Home',
    });

    userEvent.click(homeTextLink);

    const heading = getByRole('heading', {
      name: 'Pokédex',
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Testando se a aplicação é redirecionada para a página about', () => {
    const { getByRole } = renderWithRouter(<App />);

    const aboutTextLink = getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutTextLink);

    const aboutHeading = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  it('Testando se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      const { getByRole } = renderWithRouter(<App />);

      const favoriteTextLink = getByRole('link', {
        name: 'Favorite Pokémons',
      });

      userEvent.click(favoriteTextLink);

      const favoriteHeading = getByRole('heading', {
        name: 'Favorite pokémons',
        level: 2,
      });

      expect(favoriteHeading).toBeInTheDocument();
    });

  it('Testando se a aplicação é redirecionada para a página Not Found', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/not-found');

    const pageText = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });

    expect(pageText).toBeInTheDocument();
  });
});

// describe('Requisito 1', () => {

// });
