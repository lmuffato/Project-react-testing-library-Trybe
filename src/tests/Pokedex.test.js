import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';
import pokemons from '../data';

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
    /* userEvent.click(getByText(/fire/i)); */
    expect(getByText(/charmander/i)).toBeInTheDocument();

    // const buttonNext = getByText('Próximo pokémon');
    userEvent.click(buttonNext);

    expect(getByText(/rapidash/i)).toBeInTheDocument();

    userEvent.click(buttonNext);
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });

  test('shows only one pokemon', () => {
    const { getByText, container } = renderWithRouter(<App />);

    // userEvent.click(getByText('Próximo pokémon'));
    const pokemonsShown = container.querySelectorAll('.pokemon');
    expect(pokemonsShown.length).toBe(1);

    userEvent.click(getByText('Próximo pokémon'));
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
        userEvent.click(button);
      });
    }
  });

  test('testing button All', () => {
    const { getByText } = renderWithRouter(<App />);

    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    const buttonNext = getByText('Próximo pokémon');
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonAll);

    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(buttonNext);
    });
  });

/*   test('type buttons are created dynamically', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    const mockedPokemons = [
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
    ];

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
});
