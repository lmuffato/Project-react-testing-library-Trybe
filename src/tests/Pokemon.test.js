import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/helper';

describe('Pokemon', () => {
  it('Testa se o card contem as informações corretas', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokeImage = getByAltText(/pikachu sprite/i);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage.src).toBe(imageSrc);
  });
  it('Testa se o link "mais detalhes" leva a url "/pokemons/<id>"', () => {
    const { getByText, history, getByAltText } = renderWithRouter(<App />);
    const details = getByText(/more details/i);
    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const location = history.location.pathname;
    expect(location).toEqual('/pokemons/25');
    userEvent.click(getByText(/favoritado/i));
    const star = getByAltText(/pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star.src).toMatch(/star-icon.svg/i);
  });
});
