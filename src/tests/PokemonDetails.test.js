import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Teste o componente PokemonDetails.js', () => {
  test('as infos detalhadas do Pokémon selec são mostradas na tela', () => {
    RenderWithRouter(<App />);
    const detalhes = screen.getByText(/More Details/i);
    expect(detalhes).toBeInTheDocument();

    userEvent.click(detalhes);

    const pokDetalhes = screen.getByText(/Pikachu details/i);
    expect(pokDetalhes).toBeInTheDocument();
  });

  // Fonte: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/60/files
  // https://github.com/tryber/sd-010-a-project-react-testing-library/pull/61/files

  test('existe na pág uma seção com os mapas contendo as loc do pokémon', () => {
    RenderWithRouter(<App />);
    const detalhes = 'More details';
    const pokName = 'pokemon-name';
    const moreDetailsLink = screen.getByRole('link', { name: detalhes });
    fireEvent.click(moreDetailsLink);
    const pkmName = screen.getByTestId(pokName).innerHTML;
    const textoHeading = `Game Locations of ${pkmName}`;
    const heading = screen.getByRole('heading', { level: 2, name: textoHeading });
    expect(heading).toBeInTheDocument();
    const loc = screen.getAllByAltText(`${pkmName} location`);
    expect(loc).toHaveLength(2);
    expect(loc[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(loc[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
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
