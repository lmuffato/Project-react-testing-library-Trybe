import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './RenderWithRouter';

describe('Testa componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: 'More details' });
    userEvent.click(link);
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    const checkbox = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const linkFavorite = getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorite);
    expect(getByText('Pikachu'));
  });
});
