import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test about pokemon details', () => {
  it('test if it shows the pokemon name ', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const pikachuDetails = getByText(/pikachu details/i);
    expect(pikachuDetails).toBeInTheDocument();
  });
  it('test if link "More Details" dosen`t show at Pokemon Details', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();
  });
  it('test if heading summary shows at the page', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const summary = getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
  });
  it('test if text summary shows at the page', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const summary = getByText('This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.');
    expect(summary).toBeInTheDocument();
  });
});

describe('test about pokemon location', () => {
  it('test if heading Game Location shows at the page', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const gameLocation = getByText(/Game Locations of Pikachu/i);
    expect(gameLocation).toBeInTheDocument();
  });
  it('test if shows the text with the location', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const firstLocation = getByText(/Kanto Viridian Forest/i);
    expect(firstLocation).toBeInTheDocument();
    const secondLocation = getByText(/Kanto Power Plant/i);
    expect(secondLocation).toBeInTheDocument();
  });
  it('test if map shows', () => {
    const { getAllByAltText, getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const mapImages = getAllByAltText(/pikachu location/i);
    expect(mapImages[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImages[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('Test if user can favorite pokemon', () => {
  // https://stackoverflow.com/questions/55177928/how-do-you-check-a-checkbox-in-react-testing-library
  // link que mostra onde aprendi a usar .checked
  it('test favorite checkbox', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteCheckbox.checked).toBe(false);
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(true);
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(false);
  });
  it('test if checkbox has "Pokémon favoritado?" as label', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);
    const favoriteCheckbox = getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteCheckbox).toBeInTheDocument();
  });
});
