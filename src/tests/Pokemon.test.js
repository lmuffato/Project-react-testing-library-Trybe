import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado card de determinado Pokemon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    // const { averageWeight } = pokemons[0];
    // const { value, measurementUnit } = averageWeight;
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const img = getByAltText('Pikachu sprite');

    // expect(name, type, weight, img).toBeInTheDocument();
    expect(name.innerHTML).toBe('Pikachu');
    expect(type.innerHTML).toBe('Electric');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    // expect(value).toHaveTextContent('6.0');
    // expect(measurementUnit).toHaveTextContent('kg');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Verifica caminho para detalhes Pikachu', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const detailsBtn = getByRole('link', {
      nome: /more details/i,
    });
    fireEvent.click(detailsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Testa se o Pokemon está marcado como favorito', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const favStar = getByAltText('Pikachu is marked as favorite');
    expect(favStar.src).toContain('/star-icon.svg');
    expect(favStar.alt).toBe('Pikachu is marked as favorite');
  });
});

// Referências:
// Repositório e explicação do Guilherme: https://github.com/tryber/sd-010-a-project-react-testing-library/blob/guilhermedornnelles-project-react-testing-library/src/tests/Pokemon.test.js
