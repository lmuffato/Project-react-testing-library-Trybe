import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pikachu = pokemons.find((pokemon) => pokemon.name === 'Pikachu');

describe('Pokemon Details Test', () => {
  test('pokemon details informações', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    userEvent.click(getByRole('button', { name: /Electric/ }));

    const moreDatilsLink = getByText(/More details/);
    expect(moreDatilsLink).toBeInTheDocument();
    userEvent.click(moreDatilsLink);
    expect(moreDatilsLink).not.toBeInTheDocument();
    expect(getByText(/Pikachu Details/)).toBeInTheDocument();

    const summaryHeader = getByRole('heading', { name: /Summary/, level: 2 });
    expect(summaryHeader).toBeInTheDocument();

    const pokeInfo = getByText((content, element) => element.tagName.toLowerCase() === 'p'
        && content.toLowerCase().includes('electricity'));
    expect(pokeInfo).toBeInTheDocument();
  });

  test('testar se existe o mapa com a localização dos pokes', () => {
    const { foundAt, name } = pikachu;

    const { getByRole, getByText, getAllByAltText } = renderWithRouter(<App />);
    userEvent.click(getByRole('button', { name: /Electric/ }));
    const moreDatilsLink = getByText(/More details/);
    userEvent.click(moreDatilsLink);

    const mapHeader = getByRole('heading',
      { name: /Game Locations of Pikachu/, level: 2 });
    expect(mapHeader).toBeInTheDocument();

    const mapImg = getAllByAltText(`${name} location`);
    foundAt.forEach(({ map, location }, index) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(mapImg[index]).toBeInTheDocument();
      expect(mapImg[index].getAttribute('src')).toBe(map);
    });
    expect(mapImg).toHaveLength(foundAt.length);
  });

  test('favorite icon in more details', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    userEvent.click(getByRole('button', { name: /Electric/ }));
    const moreDatilsLink = getByText(/More details/);
    userEvent.click(moreDatilsLink);

    const checkBoxMarked = getByRole('checkbox');
    expect(checkBoxMarked).toBeInTheDocument();
    expect(checkBoxMarked).not.toBeChecked();
    userEvent.click(checkBoxMarked);
    expect(checkBoxMarked).toBeChecked();
    const toValueLabel = checkBoxMarked.parentNode;
    expect(toValueLabel).toHaveTextContent('Pokémon favoritado?');
  });
});
