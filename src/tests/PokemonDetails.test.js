import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('PokemonDetails test', () => {
  it('mostra as informações detalhadas do pkmn', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    expect(getByRole('link', {
      name: /more details/i,
    })).toBeInTheDocument();

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();

    // expect(getByRole('link', {
    //   name: /more details/i,
    // })).not.toBeInTheDocument();

    expect(getByRole('heading', {
      level: 2,
      name: /Summary/i,
    })).toBeInTheDocument();

    expect(getByText(/electricity/i)).toBeInTheDocument();
  });

  it('mostra mapa das info do pkmn', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    expect(getByRole('link', {
      name: /more details/i,
    })).toBeInTheDocument();

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    const locationsHeading = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });

    expect(locationsHeading).toBeInTheDocument();

    const locationMap = getAllByAltText(/Pikachu location/i);
    const url = [
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    ];
    expect(locationMap).toHaveLength(2);
    locationMap.forEach((map, index) => {
      expect(map).toBeInTheDocument();
      expect(map.src).toBe(url[index]);
    });
  });

  it('consigo favoritar estando na pagina de detalhes', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);

    expect(getByRole('link', {
      name: /more details/i,
    })).toBeInTheDocument();

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));
    expect(getByLabelText(/Pokémon favoritado?/)).toBeInTheDocument();

    userEvent.click(screen.getByLabelText(/Pokémon favoritado?/));
    const pikachuFav = getByAltText(/Pikachu is marked as favorite/i);
    expect(pikachuFav.src).toContain('/star-icon.svg');
  });
});
