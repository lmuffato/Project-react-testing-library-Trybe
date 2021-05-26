import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('PokemonDetails.js', () => {
  test('Select Pokemom', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    data.forEach((elemento, index) => {
      for (let i = 0; i < index; i += 1) {
        const botaoProximo = getByText('Próximo pokémon');
        userEvent.click(botaoProximo);
      }

      const linkDetails = getByText('More details');
      userEvent.click(linkDetails);

      const textoPagina = getByText(`${elemento.name} Details`);
      const textoResumo = getByText('Summary');
      const checkbox = getByRole('checkbox');
      expect(textoPagina).toBeInTheDocument();
      expect(textoPagina.tagName).toBe('H2');
      expect(linkDetails).not.toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
      expect(checkbox.checked).toBeFalsy();

      expect(textoResumo).toBeInTheDocument();
      expect(textoResumo.tagName).toBe('H2');
      expect(getByText(elemento.summary)).toBeInTheDocument();
      expect(getByText(elemento.summary).tagName).toBe('P');

      userEvent.click(checkbox);

      expect(checkbox.checked).toBeTruthy();
      expect(checkbox.parentNode.tagName).toBe('LABEL');
      expect(checkbox.parentNode.innerHTML).toMatch('Pokémon favoritado?');
      userEvent.click(getByText('Home'));
    });
  });

  test('testing locations', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    data.forEach((elemento, index) => {
      for (let i = 0; i < index; i += 1) {
        const botaoProximo = getByText('Próximo pokémon');
        userEvent.click(botaoProximo);
      }

      const linkDetails = getByText('More details');

      userEvent.click(linkDetails);

      const textoLocalizacao = getByText(`Game Locations of ${elemento.name}`);

      expect(textoLocalizacao).toBeInTheDocument();
      expect(textoLocalizacao.tagName).toBe('H2');

      elemento.foundAt.forEach((elementfoundA, indice) => {
        const image = getAllByAltText(`${elemento.name} location`);
        expect(getByText(elementfoundA.location)).toBeInTheDocument();
        expect(image[indice]).toHaveAttribute('src', elementfoundA.map);
        expect(image[indice]).toHaveAttribute('alt', `${elemento.name} location`);
      });

      userEvent.click(getByText('Home'));
    });
  });
});
