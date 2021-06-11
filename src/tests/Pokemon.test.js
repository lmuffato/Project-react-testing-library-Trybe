import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 6', () => {
  test('If a card with information of a particular pokémon is rendered', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <App />,
    );
    const pokemon = getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    const type = getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');
    const weight = getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    const image = getByRole('img');
    expect(image.alt).toBe('Pikachu sprite');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test(
    'If the card of a particular pokémon has a link to details', () => {
      const { getByText, getByRole, history } = renderWithRouter(
        <App />,
      );
      const pikachu = getByText('Pikachu');
      expect(pikachu).toBeInTheDocument();
      const link = getByRole('link', { name: /more details/i });
      userEvent.click(link);
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');
    },
  );

  test('If the favorited pokémons have a star', () => {
    const {
      getByText, history, getByLabelText, getByRole, getByAltText,
    } = renderWithRouter(
      <App />,
    );
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const link = getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteCheck = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);
    const image = getByAltText('Pikachu is marked as favorite');
    expect(image.src).toBe('http://localhost/star-icon.svg');
  });
});
