import React from 'react';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test if Pokedex component', () => {
  it('renders the text Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  it('changes the page when the next pokemon button is on click', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const button = getByTestId('next-pokemon');
    userEvent.click(button);
    const charmanderNameElement = getByTestId('pokemon-name');
    // Fonte de consulta: https://testing-library.com/docs/dom-testing-library/api-within
    const charmanderNameText = within(charmanderNameElement).getByText(/charmander/i);
    expect(charmanderNameElement).toBeInTheDocument();
    expect(charmanderNameText).toBeInTheDocument();
  });
  it('renders one pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonsInThePage = getAllByTestId('pokemon-name');
    expect(pokemonsInThePage.length).toBe(1);
  });
  it('has filter buttons', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const filterButton = getByRole('button', { name: /fire/i });
    userEvent.click(filterButton);
    const typeInThePage = getByTestId('pokemon-type');
    const typeInThePageText = within(typeInThePage).getByText(/fire/i);
    expect(typeInThePageText).toBeInTheDocument();
  });
  it('cleans the filter when all button is on click', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: /all/i });
    userEvent.click(allButton);
    const typeInTheDocument = getByTestId('pokemon-type');
    const typeInTheDocumentText = within(typeInTheDocument).getByText(/Electric/i);
    expect(typeInTheDocumentText).toBeInTheDocument();
  });
  it('has one button to each type of pokemon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typesInTheScreen = getAllByTestId('pokemon-type-button');
    const length = 7;
    expect(typesInTheScreen.length).toBe(length);
  });
  it('has the next Pokémon button disabled when'
  + 'a filtered list of Pokémon has only one Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/i });
    const eletricButton = getByRole('button', { name: /Electric/i });
    userEvent.click(eletricButton);
    expect(nextPokemonButton).toBeDisabled();
  });
});
