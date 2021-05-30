import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found,'
    + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);

    const semFavoritos = screen.getByText(/No favorite pokemon found/i);
    expect(semFavoritos).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    renderWithRouter(<App />);

    const linkFavorites = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(linkFavorites);

    expect(screen.queryByTestId('pokemon-name')).not.toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: /electric/i,
    });
    userEvent.click(button);

    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);

    const checkbox = screen.getByRole('checkbox', {
      name: /Pokémon favoritado/i,
    });
    userEvent.click(checkbox);

    const favoritos = screen.getAllByTestId('pokemon-name');
    expect(favoritos[0].innerHTML).toBe('Pikachu');
  });
});
