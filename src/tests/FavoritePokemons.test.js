import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Favorite Pokemons', () => {
  test('é exibido na tela a mensagem No favorite pokemon found'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);
    const titulo = screen.getByText('No favorite pokemon found');
    expect(titulo).toBeInTheDocument();
  });

  test('é exibido todos os cards de pokémons favoritados', () => {
    RenderWithRouter(<App />);
    const aboutLink = screen.getAllByRole('link')[2];
    userEvent.click(aboutLink);
  });
});
