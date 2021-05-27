import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Favorite Pokemons', () => {
  test('é exibido na tela a mensagem No favorite pokemon found'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);
    const titulo = screen.getByText('No favorite pokemon found');
    expect(titulo).toBeInTheDocument();
  });

  test('é exibido todos os cards de pokémons favoritados', () => {
    RenderWithRouter(<App />);
    // clico no more datails link
    const detailsLink = screen.getByText('More details');
    userEvent.click(detailsLink);

    // clico na checkbok para adicionar as favoritos
    const addFavorito = screen.getByRole('checkbox');
    userEvent.click(addFavorito);

    // clico no link de pokemons favoritos
    const favoritePokemon = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePokemon);

    // verifico se existe o texto More details pois assim é sinal que existe o card do pokemon na pagina de favoritos
    const pokemonDetail = screen.getByText('More details');
    expect(pokemonDetail).toBeInTheDocument();

    // tirei essa ideia do pull request do colega de turma Eduardo Seije https://github.com/tryber/sd-010-a-project-react-testing-library/pull/20/files
  });
});
