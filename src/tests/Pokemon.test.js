import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter ';
import App from '../App';

describe('', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toBeInTheDocument();
  });

  it('', () => {
    const { getByRole, getByTestId, getByAltText } = renderWithRouter(<App />);
    const btnDragon = getByRole('button', {
      name: /dragon/i,
    });
    userEvent.click(btnDragon);

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImg = getByAltText('Dragonair sprite');

    expect(pokemonName).toHaveTextContent('Dragonair');
    expect(pokemonType).toHaveTextContent('Dragon');
    expect(pokemonWeight).toHaveTextContent('Average weight: 16.5 kg');
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    expect(pokemonImg).toBeInTheDocument();
  });

  it('Teste se o card indicado na Pokédex contém um link para exibir detalhes', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const selectDetails = getByRole('link', {
      name: /more details/i,
    });
    expect(selectDetails).toBeInTheDocument();
    userEvent.click(selectDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const selectDetails = getByRole('link', {
      name: /more details/i,
    });
    expect(selectDetails).toBeInTheDocument();
    userEvent.click(selectDetails);

    const selectFavorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(selectFavorite);
    expect(selectFavorite).toBeChecked();

    const star = getByAltText('Pikachu is marked as favorite');
    expect(star.src).toBe('http://localhost/star-icon.svg');
    expect(star).toBeInTheDocument();
  });
});
