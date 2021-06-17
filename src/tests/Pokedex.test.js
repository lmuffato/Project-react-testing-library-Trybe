import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the Pokedex main page', () => {
  test('there is a h2 with a text ', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /^Encountered pokémons$/i,
    })).toBeInTheDocument();
  });

  test('shows the next pokémon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const initialPokemonCard = screen.getByText('Pikachu');
    expect(initialPokemonCard).toBeInTheDocument();
    userEvent.click(nextButton);
    const nextPokemonCard = screen.getByText('Charmander');
    expect(nextPokemonCard).toBeInTheDocument();
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    const lastPokemonCard = screen.getByText('Dragonair');
    expect(lastPokemonCard).toBeInTheDocument();
    userEvent.click(nextButton);
    const firstPokemonCard = screen.getByText('Pikachu');
    expect(firstPokemonCard).toBeInTheDocument();
  });

  test('Only one Pokémon card is shown at a time', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });

  test('shows only pokémons of same type', () => {
    renderWithRouter(<App />);
    const filter = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(filter);
    expect(screen.getByText('Charmander'));
    const nextFire = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextFire);
    expect(screen.getByText('Rapidash'));
    userEvent.click(nextFire);
    expect(screen.getByText('Charmander'));
  });

  test('tests if there is a button without filter', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', {
      name: /all/i,
    });
    expect(screen.getByTestId(''));
    userEvent.click(all);
    expect(screen.getByText('Pikachu'));
    const next = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(next);
    expect(screen.getByText('Charmander'));
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    userEvent.click(next);
    const lastOfAll = screen.getByText('Dragonair');
    expect(lastOfAll).toBeInTheDocument();
    userEvent.click(next);
    const firstOfAll = screen.getByText('Pikachu');
    expect(firstOfAll).toBeInTheDocument();
  });

  test('tests if there is a button for each type of pokémon', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', {
      name: /^all$/i,
    });
    expect(allBtn).toBeInTheDocument();
    const electricBtn = screen.getByRole('button', {
      name: /^electric$/i,
    });
    expect(electricBtn).toBeInTheDocument();
    const fireBtn = screen.getByRole('button', {
      name: /^fire$/i,
    });
    expect(fireBtn).toBeInTheDocument();
    const bugBtn = screen.getByRole('button', {
      name: /^bug$/i,
    });
    expect(bugBtn).toBeInTheDocument();
    const poisonBtn = screen.getByRole('button', {
      name: /^poison$/i,
    });
    expect(poisonBtn).toBeInTheDocument();
    const psychicBtn = screen.getByRole('button', {
      name: /^psychic$/i,
    });
    expect(psychicBtn).toBeInTheDocument();
    const normalBtn = screen.getByRole('button', {
      name: /^normal$/i,
    });
    expect(normalBtn).toBeInTheDocument();
    const dragonBtn = screen.getByRole('button', {
      name: /^dragon$/i,
    });
    expect(dragonBtn).toBeInTheDocument();
  });

  test('button disabled', () => {
    renderWithRouter(<App />);
    const electricFilter = screen.getByRole('button', {
      name: /electric/i,
    });
    userEvent.click(electricFilter);
    expect(screen.getByRole('button', {
      name: /próximo pokémon/i,
    })).toBeDisabled();
  });
});
