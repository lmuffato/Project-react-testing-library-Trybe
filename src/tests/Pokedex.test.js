import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do requisito 5', () => {
  it('A página contém um heading "h2" com o texto determinado', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));

    const path = history.location.pathname;
    const heading2 = getAllByRole('heading').map((tag) => (tag.nodeName === 'H2'));
    const content = getAllByRole('heading')
      .find((tag) => tag.nodeName === 'H2').textContent;

    expect(path).toBe('/');
    expect(heading2).toContain(true);
    expect(content).toBe('Encountered pokémons');
  });

  const pkmBtn = 'pokemon-type';
  it('O botão com texto "próximo pokemon" funciona', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const pokemonType = 'next-pokemon';
    fireEvent.click(getByText(/Home/i));

    const highlighted = getAllByTestId(pkmBtn);
    const btn = getByTestId(pokemonType).textContent;

    expect(btn).toEqual('Próximo pokémon');

    fireEvent.click(getByText(/All/i));
    fireEvent.click(getByTestId(pokemonType));

    expect(highlighted[0].textContent).toBe('Fire');

    fireEvent.click(getByText(/All/i));
    do {
      fireEvent.click(getByTestId(pokemonType));
    } while (highlighted[0].textContent !== 'Dragon');
    fireEvent.click(getByTestId(pokemonType));

    expect(highlighted[0].textContent).toBe('Electric');
  });

  it('Mostra um pokemon por vez', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));

    const highlighted = getAllByTestId(pkmBtn);

    expect(highlighted.length).toEqual(1);
  });
  const btnPkm = 'pokemon-type-button';
  it('Filtragem de pokemon funciona', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const arrayPkm = getAllByTestId(btnPkm);

    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText('All'));
    fireEvent.click(getByText('Fire'));
    arrayPkm.forEach((type) => {
      fireEvent.click(getByText(type.textContent));
      const highlighted = getAllByTestId(pkmBtn);
      const final = highlighted.map((type2) => type2.textContent === type.textContent);
      expect(final).not.toContain(false);
    });
  });

  it('Cada botão tem o nome do tipo', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const arrayPkm = getAllByTestId(btnPkm);
    const types = ['Electric', 'Fire', 'Normal', 'Poison', 'Bug', 'Dragon', 'Psychic'];

    fireEvent.click(getByText(/Home/i));
    arrayPkm.forEach((type) => {
      const totalTypes = types.find((type2) => type2 === type.textContent);
      expect(totalTypes).not.toBe(false);
    });
  });

  it('Pokedex tem um botão para resetar', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const princialPkm = getAllByTestId(pkmBtn);

    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText('All'));

    expect(princialPkm[0].textContent).toBe('Electric');
  });

  it('Cada botão de filtro tem um tipo de pokemon e um botão para resetar', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const allBtn = [...getAllByTestId('pokemon-type-button')
      .map((e) => e.textContent), getByText('All').textContent];

    fireEvent.click(getByText(/Home/i));

    expect(allBtn).toContain('All');
    expect(allBtn).toContain('Electric');
    expect(allBtn).toContain('Poison');
    expect(allBtn).toContain('Bug');
    expect(allBtn).toContain('Dragon');
    expect(allBtn).toContain('Psychic');
    expect(allBtn).toContain('Fire');
    expect(allBtn).toContain('Normal');
  });

  it('O botão "próximo pokemon" é desativado quando o filtro é acionado', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const btnNext = getByRole('button', { name: /Próximo pokémon/i });
    const dragonPoke = getByText(/Dragon/i);
    userEvent.click(dragonPoke);
    expect(btnNext).toBeDisabled();
  });
});
/* source: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/116/files */
