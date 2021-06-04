import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('The requirement 7 tests', () => {
  it('All informations about the Pokemon selected is on screen', () => {
    const { getByText, getAllByRole, getByTestId } = renderWithRouter(<App />);

    // tirando o tipo electric como primeira opção de tela
    fireEvent.click(getByText(/Fire/i));

    const arrayPokemons = pokemons.map((n) => n.type);
    arrayPokemons.forEach((type) => {
      fireEvent.click(screen.getByText(type));
      fireEvent.click(getByText(/More details/i));

      const nam = getByTestId('pokemon-name').textContent;
      const titleName = getAllByRole('heading');
      const link = getAllByRole('link');
      const n = 3;
      const summaryText = titleName[2].nextSibling.textContent;
      const summa = pokemons.find((summ) => {
        if (summ.type === type) {
          return summ;
        }
        return undefined;
      }).summary;

      expect(titleName[1].textContent).toContain('Details');
      expect(titleName[1].textContent).toContain(nam);
      expect(link.length).not.toBeGreaterThan(n);
      expect(titleName[2].textContent).toBe('Summary');
      expect(summaryText).toBe(summa);

      fireEvent.click(getByText(/Home/i));
    });
  });

  it('There are maps on screen indicating the Pokemon localization', () => {
    const { getByText, getAllByRole, getByTestId } = renderWithRouter(<App />);

    // tirando o tipo electric como primeira opção de tela
    fireEvent.click(getByText(/Fire/i));

    const arrayPokemons = pokemons.map((n) => n.type);
    arrayPokemons.forEach((typ) => {
      fireEvent.click(screen.getByText(typ));
      fireEvent.click(getByText(/More details/i));

      const nam = getByTestId('pokemon-name').textContent;
      const titleName = getAllByRole('heading');
      const allImgOnScreen = getAllByRole('img').map((img) => img.src);
      const allAltOnScreen = getAllByRole('img').map((img) => img.alt);
      const allLocationsOnScreen = getAllByRole('img').map((img) => {
        if (img.nextSibling !== null) {
          return img.nextSibling.textContent;
        }
        return '';
      });
      const objPokemons = pokemons.find((loc) => {
        if (loc.type === typ) {
          return loc;
        }
        return undefined;
      });
      const matchImgFromData = objPokemons.foundAt.map((src) => src.map);
      const matchLocation2FromData = objPokemons.foundAt.map((src) => src.location);

      expect(titleName[3].nodeName).toBe('H2');
      expect(titleName[3].textContent).toContain('Game Locations of');
      expect(titleName[3].textContent).toContain(nam);
      matchImgFromData.forEach((e) => {
        expect(allImgOnScreen).toContain(e);
        expect(allAltOnScreen).toContain(`${nam} location`);
      });
      matchLocation2FromData.forEach((e2) => {
        expect(allLocationsOnScreen).toContain(e2);
      });

      fireEvent.click(getByText(/Home/i));
    });
  });

  it('The user can selecting the Pokemon like favorite', () => {
    const {
      getByText,
      getByRole,
      getAllByRole,
      getByLabelText,
    } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));

    expect(getAllByRole('checkbox').length).toBeGreaterThan(0);

    fireEvent.click(getByRole('checkbox'));

    expect(getByRole('checkbox')).toBeChecked();

    expect(getByLabelText('Pokémon favoritado?').type).toBe('checkbox');
  });
});
