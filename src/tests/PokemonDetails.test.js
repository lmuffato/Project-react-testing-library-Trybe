import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testes sobre o requisito 7', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    const { getByText, getAllByRole, getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Fire/i));

    const arrayPokemons = pokemons.map((n) => n.type);
    arrayPokemons.forEach((type) => {
      fireEvent.click(screen.getByText(type));

      fireEvent.click(getByText(/More details/i));

      const nome = getByTestId('pokemon-name').textContent;
      const h2 = getAllByRole('heading');
      const link = getAllByRole('link');
      const NUM = 3;
      const textoResumo = h2[2].nextSibling.textContent;
      const resumo = pokemons.find((summ) => {
        if (summ.type === type) {
          return summ;
        }
        return undefined;
      }).summary;
      expect(h2[1].textContent).toContain('Details');
      expect(h2[1].textContent).toContain(nome);
      expect(link.length).not.toBeGreaterThan(NUM);
      expect(h2[2].textContent).toBe('Summary');
      expect(textoResumo).toBe(resumo);

      fireEvent.click(getByText(/Home/i));
    });
  });

  it('Verifica a existência de mapas na tela', () => {
    const { getByText, getAllByRole, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Fire/i));
    const arrayPokemons = pokemons.map((n) => n.type);
    arrayPokemons.forEach((typ) => {
      fireEvent.click(screen.getByText(typ));

      fireEvent.click(getByText(/More details/i));

      const nome = getByTestId('pokemon-name').textContent;
      const h2 = getAllByRole('heading');
      const imagens = getAllByRole('img').map((img) => img.src);
      const textoAlternativo = getAllByRole('img').map((img) => img.alt);

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

      expect(h2[3].nodeName).toBe('H2');
      expect(h2[3].textContent).toContain('Game Locations of');
      expect(h2[3].textContent).toContain(nome);

      matchImgFromData.forEach((e) => {
        expect(imagens).toContain(e);
        expect(textoAlternativo).toContain(`${nome} location`);
      });
      matchLocation2FromData.forEach((e2) => {
        expect(allLocationsOnScreen).toContain(e2);
      });

      fireEvent.click(getByText(/Home/i));
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
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
