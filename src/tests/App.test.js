import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test App', () => {
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

  it('checks home link and its operations', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkHome = getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument(); // verifica se existe esse link
    userEvent.click(linkHome);
    const phraseInHome = getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(phraseInHome).toBeInTheDocument(); // verifica se após clicar há a frase acima
  });

  it('checks about link and its operations', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkAbout = getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument(); // verifica a existencia do link about

    userEvent.click(linkAbout);
    const phraseInAbout = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(phraseInAbout).toBeInTheDocument(); // verifica se após clicar a pagina correta é carregada
  });

  it('checks favorite pokémons link and its operations', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkFav = getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFav).toBeInTheDocument(); // verifica a presença do link

    userEvent.click(linkFav);
    const phraseInFavorite = getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });
    expect(phraseInFavorite).toBeInTheDocument(); // verifica se a page correta foi carregada
  });

  it('checks if the NotFound page is loaded when the URL does not exist', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/rota-maluca' });
    const phraseInInvalidPage = getByText(/page requested not found/i);
    expect(phraseInInvalidPage).toBeInTheDocument();
  });
});
