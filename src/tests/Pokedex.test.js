import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Tests in Pokedex.js', () => {
  it('Contain an tag h2 with the text: Encountered pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const requiredText = 'Encountered pokémons';
    const heading = screen.getByRole('heading', { level: 2, name: requiredText });
    expect(heading).toBeInTheDocument();
  });
  it('Appear new pokemon when click in: proximo pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const previousPokemon = screen.getByTestId('pokemon-name').outerHTML;
    const proximoPokemonButton = screen.getByRole('button', {name: 'Próximo pokémon'});
    fireEvent.click(proximoPokemonButton);
    const currentPokemon = screen.getByTestId('pokemon-name').outerHTML;
    console.log(previousPokemon, currentPokemon);
    expect(previousPokemon).not.toBe(currentPokemon);
  });
});
