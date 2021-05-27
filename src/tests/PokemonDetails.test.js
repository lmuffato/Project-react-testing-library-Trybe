import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('7. Testando componente <PokemonDetails />', () => {
  test('as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByRole, queryByRole, history, container } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');

    const detailHeading = getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(detailHeading).toBeInTheDocument();

    expect(queryByRole('link', { name: 'More details' })).toBeNull();

    const summaryDeatailHeading = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryDeatailHeading).toBeInTheDocument();

    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
  });

  test('existe na página uma seção com os mapas contendo as localizações do pokémon', () => {});

  test('o usuário pode favoritar um pokémon através da página de detalhes.', () => {});

})
