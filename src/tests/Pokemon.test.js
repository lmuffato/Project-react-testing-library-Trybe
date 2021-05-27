import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const imgAltPokemon = screen.getByAltText('Pikachu sprite');
    const imgLinkPokemon = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(imgAltPokemon).toHaveAttribute('src', imgLinkPokemon);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeInTheDocument();
  });
  it('Se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);
    const pokemonDetails = screen.getByText(/pikachu details/i);
    expect(pokemonDetails).toBeInTheDocument();
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(linkDetails);

    const pokemonFavorito = screen.getByRole('checkbox');

    userEvent.click(pokemonFavorito);

    const starPokemon = screen.getByAltText('Pikachu is marked as favorite');

    expect(starPokemon).toHaveAttribute('src', '/star-icon.svg');

    expect(starPokemon).toBeInTheDocument();
  });
});
