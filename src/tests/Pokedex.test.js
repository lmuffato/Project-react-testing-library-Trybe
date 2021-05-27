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
  describe('Testing next pokemon button', () => {
    it('should contain the text "Próximo pokémon"', () => {
      const { getByText } = renderWithRouter(<App />);
      const button = getByText(/Próximo pokémon/);
      expect(button).toBeInTheDocument();
    });
    it('should be shown one pokemon at a time', () => {
      const { getByTestId } = renderWithRouter(<App />);
      clickEvent(getByTestId);
      let pokemon = getByTestId(nameTestId);
      expect(pokemon.textContent).toBe('Charmander');
      clickEvent(getByTestId);
      pokemon = getByTestId(nameTestId);
      expect(pokemon.textContent).toBe('Caterpie');
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
      const buttons = getAllByTestId('pokemon-type-button');
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
});
