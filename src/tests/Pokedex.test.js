import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('pokedex', () => {
  it('render a heading', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });

  it('render another pokemon', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextButton = getByText('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    const nextPokemon = getByTestId('pokemon-name');
    expect(nextPokemon).toBeInTheDocument();

    const nextPokemonType = getByTestId('pokemon-type');
    expect(nextPokemonType).toBeInTheDocument();
  });

  it('renders a pokemons types button', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const typeButton = getAllByTestId('pokemon-type-button');
    expect(typeButton[0]).toBeInTheDocument();
    expect(typeButton[0]).toHaveTextContent('Electric');
  });

  it('render a all button', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');
  });

  it('filter pokemons for type', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const fireButton = getByText('Fire');
    expect(fireButton).toBeInTheDocument();
    fireEvent.click(fireButton);

    const firePokemonName = getByText('Charmander');
    expect(firePokemonName).toBeInTheDocument();

    const nextButton = getByText('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    const anotherFirePokemon = getByText('Rapidash');
    expect(anotherFirePokemon).toBeInTheDocument();

    const allButton = getByText('All');
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);

    const withoutFilterPokemon = getByText('Pikachu');
    expect(withoutFilterPokemon).toBeInTheDocument();

    fireEvent.click(nextButton);

    const anotherWithoutFilterPokemon = getByText('Charmander');
    expect(anotherWithoutFilterPokemon).toBeInTheDocument();
  });
});
