import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Teste o componente PokemonDetails.js', () => {
  test('as infos detalhadas do Pokémon selec são mostradas na tela', () => {
    RenderWithRouter(<App />);
    const detailsLink = screen.getByText(/More Details/i);
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);

    const pokeDetails = screen.getByText(/Pikachu details/i);
    expect(pokeDetails).toBeInTheDocument();
  });

  test('existe na pág uma seção com os mapas contendo as loc do pokémon', () => {
    const { getByRole, getAllByAltText } = RenderWithRouter(<App />);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);
    const pikachuLocationsImg = getAllByAltText(/pikachu location/i);
    expect(pikachuLocationsImg[0]).toBeInTheDocument();
    expect(pikachuLocationsImg[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocationsImg[1]).toBeInTheDocument();
    expect(pikachuLocationsImg[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pikachuLocationsImg.length).toBe(2);
  });

  test('suário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, history, getByLabelText } = RenderWithRouter(<App />);
    userEvent.click(getByText(/More details/i));
    expect(history.location.pathname).not.toBe('/');
    const checkFavorite = getByLabelText('Pokémon favoritado?');
    expect(checkFavorite).not.toBeChecked();
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();
  });
});
