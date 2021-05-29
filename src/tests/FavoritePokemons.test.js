import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite '
  + 'pokemon found, se não houverem favoritos.', () => {
    const screen = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /favorite/i }));
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const screen = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /favorite/i }));
    expect(screen.queryByTestId('pokemon-name')).not.toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const screen = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: /electric/i }));
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /Pokémon favoritado/i }));
    userEvent.click(screen.getByRole('link', { name: /home/i }));
    userEvent.click(screen.getByRole('button', { name: /poison/i }));
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /Pokémon favoritado/i }));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    console.log(screen.history.location.pathname);
    const pokemonsFavorited = screen.getAllByTestId('pokemon-name');
    expect(pokemonsFavorited.length).toBe(2);
    expect(pokemonsFavorited[0].innerHTML).toBe('Pikachu');
    expect(pokemonsFavorited[1].innerHTML).toBe('Ekans');
  });
});
