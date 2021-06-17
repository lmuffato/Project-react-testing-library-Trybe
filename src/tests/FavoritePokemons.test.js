import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const linkToFavPokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(linkToFavPokemon);
  const favPokemonText = screen.getByText('No favorite pokemon found');
  expect(favPokemonText).toBeInTheDocument();
});
