import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../Render/renderWithRouter';

describe('Teste de componente FavoritePokemons', () => {
  it('Teste a renderização sem nenhuma favorito', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const paragraph = getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se renderiza todos favoritados', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByLabelText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText(/More details/i)).toBeInTheDocument();
  });
});
