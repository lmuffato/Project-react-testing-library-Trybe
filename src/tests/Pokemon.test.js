import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente Pokemon.js', () => {
  it('É renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText('Pikachu sprite');

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Exibe um link de navegação e detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokemonDetailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Existe um ícone de estrela nos pokémons favoritos', () => {
    renderWithRouter(<App />);

    const pokemonDetailsLink = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokemonDetailsLink);

    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink);

    const starIcon = screen.getByRole('img', {
      name: /marked as favorite/i,
    });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
