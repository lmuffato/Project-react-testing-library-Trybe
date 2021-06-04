import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('The Requirement 6 Tests', () => {
  const pn = 'pokemon-name';
  const pt = 'pokemon-type';
  const pw = 'pokemon-weight';
  const nextP = 'next-pokemon';

  it('The Pokemon"s name is renderized on screen', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByText(/All/i));

    const allPokemons = pokemons.map((type) => [
      type.name,
      type.type,
      type.averageWeight.value,
      type.averageWeight.measurementUnit,
      type.image,
    ]);
    allPokemons.forEach((event, i) => {
      const nameOnScreen = getByTestId(pn).textContent;
      const typeOnScreen = getByTestId(pt).textContent;
      const weightOnScreen = getByTestId(pw).textContent;
      const imgOnScreen = getByRole('img');

      expect(allPokemons[i][0]).toContain(nameOnScreen);
      expect(allPokemons[i][1]).toContain(typeOnScreen);
      expect(weightOnScreen).toContain(allPokemons[i][2]);
      expect(weightOnScreen).toContain(allPokemons[i][3]);
      expect(allPokemons[i][4]).toBe(imgOnScreen.src);
      expect(imgOnScreen.alt).toBe(`${allPokemons[i][0]} sprite`);

      fireEvent.click(getByTestId(nextP));
    });
  });

  it('The Pokemon renderized on screen has a link "more details" on', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const allPokemons = pokemons.map((type) => [
      type.name,
    ]);

    allPokemons.forEach(() => {
      const link = getByText('More details');
      const card = getByTestId(pw).nextSibling;

      expect(link.textContent).toContain(card.textContent);
      expect(card.href).toBe(link.href);

      fireEvent.click(getByTestId(nextP));
    });
  });

  it('After clicked on the link "more details", the user is redirectioned to', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const path = '/pokemons/';

    const allPokemons = pokemons.map((e) => [
      e.name,
    ]);

    allPokemons.forEach(() => {
      const href = getByText(/More details/i);
      const nam = getByTestId(pn);
      const idPath = pokemons.find((id2) => {
        if (id2.name === nam.textContent) {
          return id2;
        }
        return undefined;
      }).id;

      expect(href.href).toContain(`${path}${idPath}`);

      fireEvent.click(getByTestId(nextP));
    });
  });

  it('The URL Pokemons Details page contains "id"', () => {
    const { getByText, getByTestId, history } = renderWithRouter(<App />);

    const allPokemons = pokemons.map((e2) => [
      e2.name,
    ]);

    fireEvent.click(getByText(/All/i));
    let i = 0;
    allPokemons.forEach(() => {
      fireEvent.click(getByText(/More details/i));

      const path = history.location.pathname;
      const nam = getByTestId(pn);
      const idPokemon = pokemons.find((id3) => {
        if (id3.name === nam.textContent) {
          return id3;
        }
        return undefined;
      }).id;

      expect(path).toContain(`/pokemons/${idPokemon}`);

      i += 1;
      fireEvent.click(getByText(/Home/i));
      for (let j = 0; j < i; j += 1) {
        fireEvent.click(getByTestId(nextP));
      }
    });
  });

  it('There is a star icon within card of'
  + 'the Pokemon that was selected like favorite', () => {
    const { getByText, getByRole, getByTestId, getAllByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText(/Home/i));

    const starImg = getAllByRole('img')[1].src;
    const starImgAlt = getAllByRole('img')[1].alt;
    const nam = getByTestId(pn).textContent;
    expect(starImg).toContain('/star-icon.svg');
    expect(starImgAlt).toContain('is marked as favorite');
    expect(starImgAlt).toContain(nam);
  });
});
