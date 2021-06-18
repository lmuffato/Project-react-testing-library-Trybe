import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Teste pokedex', () => {
  test('O nome do pokémon é exibido', () => {
    const { getByText, getByAltText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const moreDetails = getByText('More details');
    userEvent.click(moreDetails);
    const nome = getByText('Pikachu');
    expect(nome).toBeInTheDocument();
    const type = getByText('Electric');
    expect(type).toBeInTheDocument();
    const weight = getByText('Average weight: 6.0 kg');
    expect(weight).toBeInTheDocument();
    const img = getByAltText('Pikachu sprite');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const checkBox = getByRole('checkbox');
    userEvent.click(checkBox);
    const favorite = getByText('Favorite Pokémons');
    userEvent.click(favorite);
    const favoriteMarked = getByAltText('Pikachu is marked as favorite');
    expect(favoriteMarked.src).toBe('http://localhost/star-icon.svg');
  });
});
