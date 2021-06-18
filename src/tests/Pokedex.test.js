import React from 'react';
import { MemoryRouter } from 'react-router';
import { fireEvent, render } from '@testing-library/react';
import { Pokedex } from '../components';
import pokemons from '../data';
import { isPokemonFavoriteByIdType } from '../types';

describe('Teste pokedex', () => {
  test('A página contém um heading', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdType }
        />
      </MemoryRouter>,
    );

    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  test('O próximo pokémon é exibido', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdType }
        />
      </MemoryRouter>,
    );

    const nextButton = getByText('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();
  });

  test('Tem um botão chamado All', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdType }
        />
      </MemoryRouter>,
    );

    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
  });

  test('Tem botões de filtro', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdType }
        />
      </MemoryRouter>,
    );

    const filterButton = getAllByRole('button', { name: 'Electric' });
    expect(filterButton[0]).toBeInTheDocument();
  });

  test('Tem um botão para cada filtro', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteByIdType }
        />
      </MemoryRouter>,
    );

    const typeButton = getAllByTestId('pokemon-type-button');
    expect(typeButton[0]).toBeInTheDocument();
    expect(typeButton[1]).toBeInTheDocument();
    expect(typeButton[2]).toBeInTheDocument();
    expect(typeButton[3]).toBeInTheDocument();
    expect(typeButton[4]).toBeInTheDocument();
    expect(typeButton[5]).toBeInTheDocument();
  });
});
