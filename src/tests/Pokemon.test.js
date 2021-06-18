
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonLink = '/pokemons/25';
describe('Testa o componente <Pokemon.js />', () => {
  test(' se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);
    const namePokemon = getByTestId('pokemon-name');
    const typePokemon = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const image = getByRole('img', { name: /pikachu sprite/i });
    const targetName = getByText(/pikachu/i);

    expect(targetName).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent(/pikachu/i);
    expect(typePokemon).toHaveTextContent(/electric/i);
    expect(weight).toHaveTextContent(/average weight: 6.0 kg/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('se o card contém um link de navegação para exibir detalhes do Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', pokemonLink);
  });

  test('se ao clicar no link é redirecionado para a página de detalhes', () => {
    const { getByRole } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });

    userEvent.click(link);
    const details = getByRole('heading', { name: /summary/i, level: 2 });

    expect(details).toBeInTheDocument();
  });

  test('se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: /more details/i });

    userEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe(pokemonLink);
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);
    const link = pokemonLink;

    history.push(link);
    const targetInfo = getByText(/pokémon favoritado?/i);
    userEvent.click(targetInfo);
    const img = getAllByRole('img');
    const star = img[1];

    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
