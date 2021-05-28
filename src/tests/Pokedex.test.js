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
  const pokemonID = 'pokemon-name';
  const nextPkm = 'Próximo pokémon';
  it('Appear new pokemon when click in: proximo pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const previousPokemon = screen.getByTestId(pokemonID).outerHTML;
    const proximoPokemonButton = screen.getByRole('button', { name: nextPkm });
    fireEvent.click(proximoPokemonButton);
    const currentPokemon = screen.getByTestId(pokemonID).outerHTML;
    expect(previousPokemon).not.toBe(currentPokemon);
  });
  it('when click in: proximo pokemon, on last in the list, appear the first', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const lenght = 8;
    const previousPokemon = screen.getByTestId(pokemonID).outerHTML;
    const proximoPkmButton = screen.getByRole('button', { name: nextPkm });
    for (let index = 0; index <= lenght; index += 1) fireEvent.click(proximoPkmButton);
    const currentPokemon = screen.getByTestId(pokemonID).outerHTML;
    expect(previousPokemon).toBe(currentPokemon);
  });
  it('If appear only one pokemon per time', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemon = screen.getAllByTestId(pokemonID);
    console.log(pokemon);
    expect(pokemon).toHaveLength(1);
  });
  it('If has filter buttons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const electricFilter = screen.getByRole('button', { name: /electric/i });
    expect(electricFilter).toBeInTheDocument();
    const fireFilter = screen.getByRole('button', { name: /fire/i });
    expect(fireFilter).toBeInTheDocument();
    const bugFilter = screen.getByRole('button', { name: /bug/i });
    expect(bugFilter).toBeInTheDocument();
    const poisonFilter = screen.getByRole('button', { name: /poison/i });
    expect(poisonFilter).toBeInTheDocument();
    const psychicFilter = screen.getByRole('button', { name: /psychic/i });
    expect(psychicFilter).toBeInTheDocument();
    const normalFilter = screen.getByRole('button', { name: /normal/i });
    expect(normalFilter).toBeInTheDocument();
    const dragonFilter = screen.getByRole('button', { name: /dragon/i });
    expect(dragonFilter).toBeInTheDocument();
  });
  it('If has filter buttons working', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pkmTypeID = 'pokemon-type';
    const proximoPkmButton = screen.getByRole('button', { name: nextPkm });
    const electricFilter = screen.getByRole('button', { name: /electric/i });
    fireEvent.click(electricFilter);
    let pkmPreviousClick = screen.getByTestId(pkmTypeID).innerHTML;
    fireEvent.click(proximoPkmButton);
    let pkmAfterClick = screen.getByTestId(pkmTypeID).innerHTML;
    expect(pkmPreviousClick && pkmAfterClick).toBe(electricFilter.innerHTML);
    const fireFilter = screen.getByRole('button', { name: /fire/i });
    fireEvent.click(fireFilter);
    pkmPreviousClick = screen.getByTestId(pkmTypeID).innerHTML;
    fireEvent.click(proximoPkmButton);
    pkmAfterClick = screen.getByTestId(pkmTypeID).innerHTML;
    expect(pkmPreviousClick && pkmAfterClick).toBe(fireFilter.innerHTML);
    const bugFilter = screen.getByRole('button', { name: /bug/i });
    fireEvent.click(bugFilter);
    pkmPreviousClick = screen.getByTestId(pkmTypeID).innerHTML;
    fireEvent.click(proximoPkmButton);
    pkmAfterClick = screen.getByTestId(pkmTypeID).innerHTML;
    expect(pkmPreviousClick && pkmAfterClick).toBe(bugFilter.innerHTML);
    const poisonFilter = screen.getByRole('button', { name: /poison/i });
    fireEvent.click(poisonFilter);
    pkmPreviousClick = screen.getByTestId(pkmTypeID).innerHTML;
    fireEvent.click(proximoPkmButton);
    pkmAfterClick = screen.getByTestId(pkmTypeID).innerHTML;
    expect(pkmPreviousClick && pkmAfterClick).toBe(poisonFilter.innerHTML);
    const psychicFilter = screen.getByRole('button', { name: /psychic/i });
    fireEvent.click(psychicFilter);
    pkmPreviousClick = screen.getByTestId(pkmTypeID).innerHTML;
    fireEvent.click(proximoPkmButton);
    pkmAfterClick = screen.getByTestId(pkmTypeID).innerHTML;
    expect(pkmPreviousClick && pkmAfterClick).toBe(psychicFilter.innerHTML);
    const normalFilter = screen.getByRole('button', { name: /normal/i });
    fireEvent.click(normalFilter);
    pkmPreviousClick = screen.getByTestId(pkmTypeID).innerHTML;
    fireEvent.click(proximoPkmButton);
    pkmAfterClick = screen.getByTestId(pkmTypeID).innerHTML;
    expect(pkmPreviousClick && pkmAfterClick).toBe(normalFilter.innerHTML);
    const dragonFilter = screen.getByRole('button', { name: /dragon/i });
    fireEvent.click(dragonFilter);
    pkmPreviousClick = screen.getByTestId(pkmTypeID).innerHTML;
    fireEvent.click(proximoPkmButton);
    pkmAfterClick = screen.getByTestId(pkmTypeID).innerHTML;
    expect(pkmPreviousClick && pkmAfterClick).toBe(dragonFilter.innerHTML);
  });
});
