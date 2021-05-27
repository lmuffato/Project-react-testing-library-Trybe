import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

const detailsLinkText = 'More details';

describe('7. Testando componente <PokemonDetails />', () => {
  test('as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByRole, queryByRole, history, container } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: detailsLinkText });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');

    const detailHeading = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(detailHeading).toBeInTheDocument();

    expect(queryByRole('link', { name: detailsLinkText })).toBeNull();

    const summaryDeatailHeading = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryDeatailHeading).toBeInTheDocument();

    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
  });

  test('existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByRole, getByText, history, getAllByAltText } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: detailsLinkText });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');

    const mapsHeading = getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu',
    });
    expect(mapsHeading).toBeInTheDocument();

    const pikachu = pokemons[0];
    expect(pikachu.foundAt).toHaveLength(2);
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();

    const mapsImages = getAllByAltText('Pikachu location');
    expect(mapsImages).toHaveLength(2);

    mapsImages.forEach((mapImg, index) => {
      expect(mapImg.src).toContain(pikachu.foundAt[index].map);
    });
  });

  test('o usuário pode favoritar um pokémon através da página de detalhes.', () => {});
});
