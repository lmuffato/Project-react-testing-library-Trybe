import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';
import pokemons from '../data';

/* const mockedPokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
]; */

const buttonNext = (getByText) => getByText('Próximo pokémon');

describe('testing Pokedex component', () => {
  test('contain a heading h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading2 = getByRole('heading', { level: 2 });
    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveTextContent('Encountered pokémons');
  });

  test('shows next pokemon when the button is clicked', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);

    const buttonType = getAllByTestId('pokemon-type-button')[1];
    expect(buttonType).toBeInTheDocument();
    userEvent.click(buttonType);

    expect(getByText(/charmander/i)).toBeInTheDocument();

    expect(buttonNext(getByText)).toBeInTheDocument();
    userEvent.click(buttonNext(getByText));

    expect(getByText(/rapidash/i)).toBeInTheDocument();

    userEvent.click(buttonNext(getByText));
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });

  test('shows only one pokemon', () => {
    const { getByText, container } = renderWithRouter(<App />);

    const pokemonsShown = container.querySelectorAll('.pokemon');
    expect(pokemonsShown.length).toBe(1);

    userEvent.click(buttonNext(getByText));
    expect(pokemonsShown.length).toBe(1);
  });

  test('testing filter buttons', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);

    const typesPokemon = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];

    for (let index = 0; index < typesPokemon; index += 1) {
      const button = getAllByTestId('pokemon-type-button')[index];
      expect(button).toBeInTheDocument();
      const filteredPokemons = pokemons
        .filter((pokemon) => pokemon.type === typesPokemon[index]);
      filteredPokemons.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        expect(button).toHaveValue(pokemon.type);
        userEvent.click(button);
      });
    }
  });

  test('testing button All', () => {
    const { getByText } = renderWithRouter(<App />);
    // Ao carregar a página, o filtro selecionado deverá ser All;
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonNext(getByText)).toBeInTheDocument();

    const checksButtonAll = () => {
      pokemons.forEach((pokemon) => {
        const pokemonName = getByText(pokemon.name);
        expect(pokemonName).toBeInTheDocument();
        userEvent.click(buttonNext(getByText));
      });
    };

    checksButtonAll(); // Checks if all pokemons are found when the page isloaded
    userEvent.click(buttonAll);
    checksButtonAll(); // Checks if all pokemons are found after the button All is clicked
  });

  /*   test('type buttons are created dynamically', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

  global.renderPokedex = jest.fn(() => {
  const { isPokemonFavoriteById } = this.state;
  return (
    <Pokedex
      pokemons={ mockedPokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />
  );
});
    const buttonsType = getAllByRole('button');
    expect(buttonsType[0]).toHaveValue('Electric');
  }); */

  test('button to next pokemon must be disabled', () => {
    const { getByText } = renderWithRouter(<App />);

    const buttonType = getByText(/Bug/i);
    expect(buttonType).toBeInTheDocument();

    expect(buttonNext(getByText)).toBeInTheDocument();
    expect(buttonNext(getByText).disabled).toBe(false);

    userEvent.click(buttonType);

    expect(buttonNext(getByText).disabled).toBe(true);
  });
});
