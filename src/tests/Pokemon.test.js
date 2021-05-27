import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Test the <Pokemon /> component', () => {
  it('Test if a card is rendered with the information of a certain Pokémon.', () => {
    const { getByRole, getByText,
      getAllByText, container } = render(<MemoryRouter><App /></MemoryRouter>);

    const cardPokemon = container.querySelector('.pokemon');

    const namePokemon = getByText(/pikachu/i);
    const typePokemon = getAllByText(/electric/i)[0];
    const weightPokemon = getByText(/average weight: 6\.0 kg/i);
    const imagePokemon = getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(imagePokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagePokemon).toHaveAttribute('alt', 'Pikachu sprite');

    expect(cardPokemon).toContainElement(namePokemon);
    expect(cardPokemon).toContainElement(typePokemon);
    expect(cardPokemon).toContainElement(weightPokemon);
    expect(cardPokemon).toContainElement(imagePokemon);
  });
  it('Test if the Pokémon card contains a navigation link to view details', () => {
    const { getByRole, container } = render(<MemoryRouter><App /></MemoryRouter>);

    const linkToDetails = getByRole('link', {
      name: /more details/i,
    });
    expect(linkToDetails).toHaveAttribute('href', '/pokemons/25');
    const cardPokemon = container.querySelector('.pokemon');
    expect(cardPokemon).toContainElement(linkToDetails);
  });

  it('Test if clicking on the link redirects the application to details page.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkToDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkToDetails);
    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
    expect(getByRole('heading', {
      name: /pikachu details/i,
    })).toBeInTheDocument();
  });

  it('Test if there is a star icon on favorite Pokémon.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkToDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkToDetails);
    const checkboxFavorite = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite).toBeChecked();
    const iconFavorite = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(iconFavorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(iconFavorite).toBeInTheDocument();
  });
});
