import React from 'react';
import renderWithRouter from "../helpers/renderWithRouter";
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('6. Testar componente <Pokemon />', () => {
  const pikachu = pokemons[0];

  test('é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite="true"
      />,
    );

    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');

    const imgPath = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const image = getByAltText('Pikachu sprite');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(imgPath);
  });

  test('o card do Pokémon contém um link para exibir mais detalhes', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite="true"
      />,
    );

    const detailsLink = getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pikachu.id}`);
  });

  test('ao clicar no link, é feito o redirecionamento para a página de detalhes', () => {});

  test('a URL exibida no navegador muda para `/pokemon/<id>`', () => {});

  test('existe um ícone de estrela nos Pokémons favoritados.', () => {});
});
