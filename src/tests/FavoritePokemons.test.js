import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import alias from './utils/alias';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes para componente "FavoritePokemons.js"', () => {
  const { link, expectToBeInTheDocument } = alias;
  test('É exibido na tela a mensagem "No favorite pokemon found",'
  + ' se a pessoa não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);

    expectToBeInTheDocument(
      screen.getByText('No favorite pokemon found'),
    );
  });

  test('É exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(link(/more details/i));
    userEvent.click(screen.getByLabelText(/pokémon favoritado/i));

    userEvent.click(link('Home'));

    userEvent.click(screen.getByTestId('next-pokemon'));
    userEvent.click(link(/more details/i));
    userEvent.click(screen.getByLabelText(/pokémon favoritado/i));

    history.push('/favorites');

    const pokemons = screen.getAllByTestId('pokemon-name');

    expect(pokemons.length).toBe(2);
  });

  test('Nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    render(<FavoritePokemons />);

    const pokemons = screen.queryAllByTestId('pokemon-name');

    expect(pokemons.length).toBe(0);
  });
});
