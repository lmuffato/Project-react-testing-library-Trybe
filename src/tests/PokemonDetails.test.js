import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test if PokemonDetails page', () => {
  it('renders the correct pokemon name', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const pokemonName = getAllByRole('heading', { level: 2 });
    expect(pokemonName[0]).toHaveTextContent('Pikachu Details');
  });
  it('not renders more details button', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    expect(moreDetailsButton).toBeInTheDocument();
    userEvent.click(moreDetailsButton);
    // Fonte: https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
    expect(moreDetailsButton).not.toBeInTheDocument();
  });
  it('renders a summary', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const summaryTitle = getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryTitle).toBeInTheDocument();
  });
  it('renders a paragraph with the summary of the specific Pokémon being viewed', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    // Fonte:https://testing-library.com/docs/queries/about/#textmatch
    const summaryPar = getByText((content) => content.startsWith('This intelligent'));
    expect(summaryPar).toHaveTextContent('This intelligent Pokémon '
     + 'roasts hard berries with electricity to make them tender enough to eat.');
    expect(summaryPar).toBeInTheDocument();
  });
  it('renders a heading with the correct pokemon name', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const locationsTitle = getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(locationsTitle).toBeInTheDocument();
  });
  it('renders location names', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const firstLocation = getByText(/kanto viridian forest/i);
    const secondLocation = getByText(/kanto power plant/i);
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();
  });
  it('renders location maps', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const pikachuLocationsImg = getAllByAltText(/pikachu location/i);
    expect(pikachuLocationsImg[0]).toBeInTheDocument();
    expect(pikachuLocationsImg[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocationsImg[1]).toBeInTheDocument();
    expect(pikachuLocationsImg[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pikachuLocationsImg.length).toBe(2);
  });
  it('favorites the pokemon by checking the checkbox', () => {
    const { getByRole, getByAltText, getByLabelText } = renderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const favoriteLabel = getByLabelText('Pokémon favoritado?');
    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteLabel).toBeInTheDocument();
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox.checked).toBe(true);
    const star = getByAltText(/pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
  });
});
