import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Requirement 05 - Testing a Pokédex', () => {
  it('there should be an h2 heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Encountered pokémons');
  });

  const clickEvent = (callback) => {
    const button = callback('next-pokemon');
    userEvent.click(button);
  };
  const nameTestId = 'pokemon-name';
  const buttonTestId = 'pokemon-type-button';
  describe('Testing next pokemon button', () => {
    it('should contain the text "Próximo pokémon"', () => {
      const { getByText } = renderWithRouter(<App />);
      const button = getByText(/Próximo pokémon/);
      expect(button).toBeInTheDocument();
    });
    it('should be shown one pokemon at a time', () => {
      const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
      clickEvent(getByTestId);
      const pokemon = getAllByTestId(nameTestId);
      expect(pokemon.length).toEqual(1);
    });
    it('should go back to the first pokemon if you were in the last', () => {
      const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
      const allPokemons = getAllByTestId('pokemon');
      for (let i = 0; i < allPokemons.length - 1; i += 1) {
        clickEvent(getByTestId);
      }
      const pokemon = getByTestId(nameTestId);
      expect(pokemon.textContent).toBe('Pikachu');
    });
  });
  it('should display only one pokemon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon');
    expect(pokemon.length).toBe(1);
  });
  describe('testing if the pokedex has filter buttons', () => {
    it(`only pokemons of the respective type should appear when
    clicked on the button`, () => {
      const checkPokemons = (buttonValue) => {
        const { getAllByText } = renderWithRouter(<App />);
        const allPokemonsType = getAllByText(buttonValue);
        allPokemonsType.forEach((pokemon) => {
          expect(buttonValue).toEqual(pokemon.textContent);
          expect(pokemon.textContent).toBe(buttonValue);
        });
      };
      const { getAllByTestId } = renderWithRouter(<App />);
      const buttons = getAllByTestId(buttonTestId);
      userEvent.click(buttons[0]);
      checkPokemons(buttons[0].textContent);
      userEvent.click(buttons[1]);
      checkPokemons(buttons[1].textContent);
    });
  });
  describe('testing reset button', () => {
    it('should contain a button to reset the filter with the name All', () => {
      const { getByText } = renderWithRouter(<App />);
      const resetButton = getByText('All');
      expect(resetButton).toBeInTheDocument();
      expect(resetButton.textContent).toBe('All');
    });

    const checkFilterAll = (callback) => {
      pokemons.forEach(({ name }) => {
        const pokeName = callback(nameTestId);
        expect(pokeName.textContent).toBe(name);
        clickEvent(callback);
      });
    };

    it('should show all pokemons normally when clicked on the button', () => {
      const { getByText, getByTestId } = renderWithRouter(<App />);
      const resetButton = getByText('All');
      userEvent.click(resetButton);
      checkFilterAll(getByTestId);
    });
    it('should when starting the page, the filter all should be selected', () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/');
      checkFilterAll(getByTestId);
    });
  });
  it('testing whether buttons are created dynamically', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const types = [...new Set(pokemons.map(({ type }) => type))];
    const buttons = getAllByTestId(buttonTestId);
    types.forEach((type, i) => {
      expect(buttons[i].textContent).toBe(type);
    });

    const expectTypes = [
      'Fire',
      'Psychic',
      'Electric',
      'Bug',
      'Poison',
      'Dragon',
      'Normal',
    ];
    expectTypes.forEach((_type, i) => {
      expect(expectTypes.indexOf(buttons[i].textContent)).not.toBe('-1');
      expect(buttons[i]).toBeInTheDocument();
      const resetButton = getByText('All');
      expect(resetButton).toBeInTheDocument();
    });
  });
  it('The Next Pokémon button should be disabled when there is only one Pokémon', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId(buttonTestId);
    buttons.forEach((button) => {
      userEvent.click(button);
      const pokemonsLength = pokemons.filter(
        ({ type }) => type === button.textContent,
      ).length;
      if (pokemonsLength <= 1) {
        const buttoNext = getByTestId('next-pokemon');
        expect(buttoNext).toBeDisabled();
      }
    });
  });
});
