import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const textMoreDetails = 'More details';
const pathToPikachuPage = '/pokemons/25';

describe('Testa o componente Pokemon Details.', () => {
  it('Testa se existe textos sobre os Pokemons;', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(textMoreDetails);
    expect(moreDetails).toHaveAttribute('href', pathToPikachuPage);
    userEvent.click(moreDetails);
    const pokemonNameDetails = getByText('Pikachu Details');
    const summary = getByText(/Summary/i);
    const summaryAbout = getByText(/this intelligent pokémon roasts hard berries with/i);
    expect(pokemonNameDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(summary.textContent).toBe('Summary');
    expect(summaryAbout).toBeInTheDocument();
  });
  it('Testa se existe na página uma seção de mapas com localizaçõe do pokémon;', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(textMoreDetails);
    expect(moreDetails).toHaveAttribute('href', pathToPikachuPage);
    userEvent.click(moreDetails);
    const gameLocationHeading = getByText(/Game Locations of Pikachu/i);
    const gamelocationsMaps = getAllByAltText('Pikachu location');
    expect(gameLocationHeading).toBeInTheDocument();
    expect(gamelocationsMaps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(gamelocationsMaps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Teste se o usuário pode favoritar um pokémon na da página de detalhes.', () => {
    const { getByAltText, getByText, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(textMoreDetails);
    expect(moreDetails).toHaveAttribute('href', pathToPikachuPage);
    userEvent.click(moreDetails);
    const favourited = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favourited);
    const isFavorited = getByAltText('Pikachu is marked as favorite');
    expect(isFavorited.src).toBe('http://localhost/star-icon.svg');
    expect(isFavorited.alt).toBe('Pikachu is marked as favorite');
  });
});
