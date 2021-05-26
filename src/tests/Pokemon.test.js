import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testa o componente "Pokemon"', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const testIdName = getByTestId('pokemon-name');
    const testIdType = getByTestId('pokemon-type');
    const testIdWeight = getByTestId('pokemon-weight');
    const altImage = getByAltText('Pikachu sprite');
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(testIdName).toHaveTextContent('Pikachu');
    expect(testIdType).toHaveTextContent('Electric');
    expect(testIdWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(altImage.src).toContain(imageSrc);
  });

  test('Testa se o card do Pokémon indicado na Pokédex'
  + 'contém um link para exibir detalhes deste Pokémon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: 'More details',
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByAltText, getByRole, getByText, history } = renderWithRouter(<App />);

    const moreDetails = getByRole('link', {
      name: 'More details',
    });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');

    const favorite = getByText('Pokémon favoritado?');

    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const imageSrc = 'http://localhost/star-icon.svg';
    const isFavorite = getByAltText('Pikachu is marked as favorite');

    expect(isFavorite.src).toBe(imageSrc);
  });
});
