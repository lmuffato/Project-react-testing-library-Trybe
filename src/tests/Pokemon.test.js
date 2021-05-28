import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Pokemon test', () => {
  it('mostra um card do pokemon com informações', () => {
    const { getByTestId, getByRole, getByAltText } = renderWithRouter(<App />);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    expect(getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(getByAltText('Pikachu sprite').src).toBe(url);
    expect(getByRole('img').src).toBe(url);
  });

  it('mostra um link `More Details`', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const detailsButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detailsButton).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('mostra uma estrela quando o pokemon é favoritado', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const detailsButton = getByRole('link', {
      name: /more details/i,
    });
    expect(detailsButton).toBeInTheDocument();
    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));
    expect(getByLabelText(/Pokémon favoritado?/)).toBeInTheDocument();
    userEvent.click(screen.getByLabelText(/Pokémon favoritado?/));
    const pikachuFav = getByAltText(/Pikachu is marked as favorite/i);
    expect(pikachuFav.src).toContain('/star-icon.svg');
  });
});
