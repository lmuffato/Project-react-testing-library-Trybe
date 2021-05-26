import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './RenderWithRouter';

/* it('', () => {}); */

const { name, summary, foundAt } = pokemons[0];

describe('Teste do componente PokemonDetails', () => {
  it('Teste se informações detalhadas são mostrados na tela', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const linkMoreDetails = getByText(/More details/i);
    userEvent.click(linkMoreDetails);
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(linkMoreDetails).not.toBeInTheDocument();
    const heading = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    const paragraph = document.getElementsByTagName('p');
    expect(paragraph[3].textContent).toBe(summary);
  });

  it('Testa se existe na página uma seção com mapas de localizacao', () => {
    const { getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);
    userEvent.click(getByText('More details'));
    expect(getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    })).toBeInTheDocument();
    foundAt.forEach(({ location, map }, index) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(getAllByAltText(`${name} location`)[index].src).toBe(map);
    });
  });

  it('Testa se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    userEvent.click(getByText('More details'));
    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
