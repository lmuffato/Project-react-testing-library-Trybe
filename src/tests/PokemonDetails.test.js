import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

const detailsLinkText = 'More details';
const pikachuPathName = '/pokemons/25';

describe('7. Testando componente <PokemonDetails />', () => {
  test('as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const {
      getByRole,
      queryByRole,
      history,
      getByText } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: detailsLinkText });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe(pikachuPathName);

    const detailHeading = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(detailHeading).toBeInTheDocument();

    expect(queryByRole('link', { name: detailsLinkText })).toBeNull();

    const summaryDeatailHeading = getByRole('heading', { level: 2, name: /Summary/ });
    expect(summaryDeatailHeading).toBeInTheDocument();

    const pikachu = pokemons[0];

    const pikachuSummaryParagraph = getByText(pikachu.summary);
    expect(pikachuSummaryParagraph).toBeInTheDocument();
  });

  test('existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByRole, getByText, history, getAllByAltText } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: detailsLinkText });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe(pikachuPathName);

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

  test('o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const {
      getByRole,
      getByText,
      history,
      getByAltText,
      queryByAltText } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: detailsLinkText });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe(pikachuPathName);

    const favCheckbox = getByRole('checkbox');
    expect(favCheckbox).toBeInTheDocument();

    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();

    userEvent.click(favCheckbox);
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
    userEvent.click(favCheckbox);
    expect(queryByAltText('Pikachu is marked as favorite')).toBeNull();
  });
});
