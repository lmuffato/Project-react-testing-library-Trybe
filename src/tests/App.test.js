// import { getByText, getByTestId, getByRole, getAllByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('App tests', () => {
  it('renderiza um título chamado `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('mostra Pokédex quando a rota é `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('renderiza uma div com dados do pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    // const pkmName = getByTestId('pokemon-name');
    // const pkmType = getByTestId('pokemon-type');
    // const pkmWeight = getByTestId('pokemon-weight');
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemon-type')).toBeInTheDocument();
    expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  });

  it('mostra botões com os tipos de pokémons', () => {
    const { getAllByTestId, getByTestId, getAllByRole } = renderWithRouter(<App />);
    // const typeBtn = getByTestId('pokemon-type-button');
    const sevenNumberLint = 7;
    const nineNumberLint = 9;
    expect(getAllByTestId('pokemon-type-button')).toHaveLength(sevenNumberLint);
    expect(getByTestId('next-pokemon')).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(nineNumberLint);
  });

  it('mostra os links `Home`, `About` e `Favorite Pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    const aboutLink = getByText(/About/i);
    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(aboutLink).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('vai para tela inicial `/` quando clicar no `Home`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    userEvent.click(getByText(/Home/i));
    expect(pathname).toBe('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
