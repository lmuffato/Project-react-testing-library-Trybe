import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Pokedex component tests', () => {
  it('renders Pokedex component, with the text "Encountered pokémons" ', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const notFoundtxt = getByText(/Encountered pokémons/i);
    expect(notFoundtxt).toBeInTheDocument();
  });
  it('renders Pokedex component, test if next pokemon button works ', async () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const nextButton = getByTestId(/next-pokemon/i);
    const nextButtonCheck = nextButton.innerHTML;
    const poke = getByTestId(/pokemon-name/i);
    const firstPoke = poke.innerHTML;
    expect(firstPoke).toBe(poke.innerHTML);
    expect(nextButton).toBeInTheDocument();

    userEvent.click(nextButton);
    const nextPoke = poke.innerHTML;
    expect(firstPoke).not.toBe(poke.innerHTML);
    expect(nextButtonCheck).toBe('Próximo pokémon');
    expect(nextPoke).toBe(poke.innerHTML);
  });
  it('renders Pokedex component, with only one PokeCard ', () => {
    const history = createMemoryHistory();
    const { queryAllByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const oneCardCheck = queryAllByText(/sprite/i);

    expect(oneCardCheck.length).toBe(0);
  });
  it('renders Pokedex component, with filter buttons ', () => {
    const history = createMemoryHistory();
    const { getByTestId, queryAllByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const buttonArray = queryAllByTestId(/pokemon-type-button/i);
    const buttonCheck = buttonArray[3];
    userEvent.click(buttonCheck);
    const pokemonCheck = getByTestId('pokemon-type');
    console.log(pokemonCheck);
    expect(buttonCheck.innerHTML).toBe(pokemonCheck.innerHTML);
  });
  it('renders Pokedex component, Reset em click button "all"', () => {
    const history = createMemoryHistory();
    const { getByRole, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const nextButton = getByTestId(/next-pokemon/i);
    const allButton = getByRole('button', { name: /all/i });
    const poketype = getByTestId('pokemon-type');
    const firstPoke = poketype.innerHTML;
    userEvent.click(nextButton);
    expect(poketype.innerHTML).not.toBe(firstPoke);
    userEvent.click(allButton);
    userEvent.click(nextButton);
    expect(poketype.innerHTML).not.toBe(firstPoke);
  });
  it('renders Pokedex component, has all type buttons including all button', () => {
    const history = createMemoryHistory();
    const { getByRole, getAllByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonArray = getAllByTestId(/pokemon-type-button/i);
    const allButton = getByRole('button', { name: /all/i });
    types.forEach((type) => {
      expect(getByRole('button', { name: type })).toBeInTheDocument();
    });
    expect(allButton).toBeInTheDocument();
    expect(buttonArray.length).toBe(types.length);
  });
  it('renders Pokedex component, Disable Next button when only have one pokemon', () => {
    const history = createMemoryHistory();
    const { getByRole, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const nextButton = getByTestId(/next-pokemon/i);
    const onePoisonPoke = getByRole('button', { name: /poison/i });
    userEvent.click(onePoisonPoke);
    expect(nextButton).toBeDisabled();
  });
});
