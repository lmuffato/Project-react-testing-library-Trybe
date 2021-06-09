import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Componente Pokemon favorito', () => {
  test('testa se a messagem eh mostrada"'
+ ' se nada eh selecionado', () => {
    const { getByText, history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');
    const paragraph = getByText(/No favorite pokemon found/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });

  test('testa se todos os cartoes de pokemons favoritos sao mostrados', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const fakePokemon = '/pokemons/25';
    history.push(`${fakePokemon}`);
    const favcheckbox = getByRole('checkbox');
    userEvent.click(favcheckbox);
    history.push('/favorites');
    const paragraph = getByText(/Pikachu/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });
});
