import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const pokemonNames = [
  /pikachu/i, /charmander/i, /Caterpie/i, /ekans/i,
  /alakazam/i, /mew/i, /rapidash/i, /snorlax/i, /dragonair/i,
];

describe('Test the <Pokedex.js /> component', () => {
  it('Test if page contains an heading with the text "Encountered pokémons".', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByRole('heading', {
      name: /encountered pokémons/i,
    })).toBeInTheDocument();
  });

  it('Test if the next pokémon displayed when the Next Pokémon button is clicked', () => {
    const { getByText, getByRole, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const all = getByRole('button', {
      name: /all/i,
    });
    const NextPokemonButton = getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(NextPokemonButton).toBeInTheDocument();
    expect(all).toBeInTheDocument();

    expect(getByText(pokemonNames[0])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(all);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[1])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[2])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[3])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[4])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[5])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[6])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[7])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[8])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);

    userEvent.click(NextPokemonButton);
    expect(getByText(pokemonNames[0])).toBeInTheDocument();
    expect(getAllByRole('link', {
      name: /more details/i,
    }).length).toBe(1);
  });
});

describe('Test filter buttons', () => {
  it(`Test if the Pokédex has the filter buttons, 
  and they filter the pokemon based on the type.`, () => {
    const { getAllByTestId, getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const numberOfBtns = 7;
    const allBtn = getAllByTestId('pokemon-type-button');
    expect(allBtn.length).toBe(numberOfBtns);

    expect(allBtn[0].textContent).toBe('Electric');
    expect(allBtn[1].textContent).toBe('Fire');
    expect(allBtn[2].textContent).toBe('Bug');
    expect(allBtn[3].textContent).toBe('Poison');
    expect(allBtn[4].textContent).toBe('Psychic');
    expect(allBtn[5].textContent).toBe('Normal');
    expect(allBtn[6].textContent).toBe('Dragon');

    const nextPokemon = getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(allBtn[0]);
    expect(getByText(pokemonNames[0])).toBeInTheDocument();

    userEvent.click(allBtn[1]);
    expect(getByText(pokemonNames[1])).toBeInTheDocument();
    userEvent.click(nextPokemon);
    expect(getByText(pokemonNames[6])).toBeInTheDocument();

    userEvent.click(allBtn[2]);
    expect(getByText(pokemonNames[2])).toBeInTheDocument();

    userEvent.click(allBtn[3]);
    expect(getByText(pokemonNames[3])).toBeInTheDocument();

    userEvent.click(allBtn[4]);
    expect(getByText(pokemonNames[4])).toBeInTheDocument();
    userEvent.click(nextPokemon);
    expect(getByText(pokemonNames[5])).toBeInTheDocument();

    userEvent.click(allBtn[5]);
    expect(getByText(pokemonNames[7])).toBeInTheDocument();

    userEvent.click(allBtn[6]);
    expect(getByText(pokemonNames[8])).toBeInTheDocument();
  });
  it(`The Next Pokémon button should be disabled when 
  a filtered list of Pokémon has only one Pokémon.`, () => {
    const { getAllByTestId, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allBtn = getAllByTestId('pokemon-type-button');
    const nextPokemon = getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(allBtn[0]);
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(allBtn[2]);
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(allBtn[3]);
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(allBtn[5]);
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(allBtn[6]);
    expect(nextPokemon.disabled).toBeTruthy();
  });
});
