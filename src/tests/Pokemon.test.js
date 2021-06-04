import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('The Requirement 6 Tests', () => {
  const pn = 'pokemon-name';

  it('The Pokemon"s name is renderized on screen', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));

    const nam = getByTestId(pn);
    const typ = getByTestId('pokemon-type');
    const weight = pokemons.map((p) => {
      if (p.name === nam.textContent) {
        return [
          p.averageWeight.value,
          p.averageWeight.measurementUnit,
          p.image,
          p.name,
        ];
      }
      return undefined;
    });
    const w = getByTestId('pokemon-weight');
    const img = getByRole('img').src;
    const altImg = getByRole('img').alt;
    expect(nam).not.toBeNull();
    expect(nam.textContent).toBe('Pikachu');
    expect(typ.textContent).toBe('Electric');
    expect(w.textContent).toContain(weight[0][0]);
    expect(img).toBe(weight[0][2]);
    expect(altImg).toContain('sprite');
    expect(altImg).toContain(weight[0][3]);

    fireEvent.click(getByText(/Fire/i));
    expect(nam.textContent).toBe('Charmander');
    expect(typ.textContent).toBe('Fire');
    const weight2 = pokemons.map((p2) => {
      if (p2.name === nam.textContent) {
        return [
          p2.averageWeight.value,
          p2.averageWeight.measurementUnit,
          p2.image,
          p2.name,
        ];
      }
      return undefined;
    });
    const w2 = getByTestId('pokemon-weight');
    const img2 = getByRole('img').src;
    const altImg2 = getByRole('img').alt;
    expect(w2.textContent).toContain(weight2[1][0]);
    expect(img2).toBe(weight2[1][2]);
    expect(altImg2).toContain('sprite');
    expect(altImg2).toContain(weight2[1][3]);
  });

  it('The Pokemon renderized on screen has a link "more details" on', () => {
    const { getByTestId, getByText, history } = renderWithRouter(<App />);

    const nam = getByTestId(pn);
    const idPath = pokemons.find((id) => {
      if (id.name === nam.textContent) {
        return id;
      }
      return undefined;
    }).id;
    fireEvent.click(getByText(/More details/i));
    const path = history.location.pathname;
    expect(path).toBe(`/pokemons/${idPath}`);
  });

  it('After clicked on the link "more details", the user is redirectioned to', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const path = '/pokemons/';
    const href = getByText(/More details/i);
    const nam = getByTestId(pn);
    const idPath = pokemons.find((id2) => {
      if (id2.name === nam.textContent) {
        return id2;
      }
      return undefined;
    }).id;

    expect(href.href).toContain(`${path}${idPath}`);

    fireEvent.click(getByText(/Fire/i));

    const href2 = getByText(/More details/i);
    const nam2 = getByTestId(pn);
    const idPath2 = pokemons.find((id3) => {
      if (id3.name === nam2.textContent) {
        return id3;
      }
      return undefined;
    }).id;

    expect(href2.href).toContain(`${path}${idPath2}`);
  });

  it('The URL Pokemons Details page contains "id"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));
    const path = history.location.pathname;

    expect(path).toContain('/pokemons/');
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
