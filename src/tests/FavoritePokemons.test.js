import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('favorite pokemon', () => {
  it('render a favorite pokemon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const FarovitesLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(FarovitesLink);

    const NotFoundPokemons = getByText(/No favorite pokemon found/i);
    expect(NotFoundPokemons).toBeInTheDocument();
  });
});
