import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Verifica se no componente FavoritePokemons: ', () => {
  it('há a mensagem "No favorite pokemon found" se não houver pokémons favoritos', () => {
    const { container } = renderWithRouter(<FavoritePokemons />);
    const favoriteContainer = container.getElementsByClassName('favorite-pokemon');
    expect(favoriteContainer.length).toBe(0);
    const notFound = container.querySelector('p');
    expect(notFound).toHaveTextContent('No favorite pokemon found');
  });

  it('é exibido todos os cards dos pokémons favoritados', () => {
    const { container } = renderWithRouter(<App />);
    const Home = screen.getByRole('link', { name: 'Home' });
    const Favorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(Home); /// Begining first add
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Charmander');
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?')); /// Ending
    userEvent.click(Home); /// Begining second add
    userEvent.click(screen.getByRole('button', { name: 'Electric' }));
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?')); /// Ending
    userEvent.click(Favorites);
    const favoriteContainer = container.getElementsByClassName('favorite-pokemon');
    expect(favoriteContainer.length).toBe(2);
  });
});
