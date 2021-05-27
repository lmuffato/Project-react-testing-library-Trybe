import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests in FavoritePokemons.js', () => {
  it('Message when don\'t have a favorite pokemon', () => {
    render(<FavoritePokemons />);
    const withoutFavoriteMessage = screen.getByText('No favorite pokemon found');
    expect(withoutFavoriteMessage).toBeInTheDocument();
  });
  it('Appear all favorite pokemons', () => {
    renderWithRouter(<App />);
    const pokemonTestID = 'pokemon-name';
    const nextPokemon = screen.getByText('Próximo pokémon');
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    let moreDetails = screen.getByText(/more details/i);
    fireEvent.click(moreDetails);
    let favoriteOption = screen.getByText(/pokémon favoritado?/i);
    fireEvent.click(favoriteOption);
    const pokemonInTheScreenDetails = screen.getByTestId(pokemonTestID);
    let favoritePokemonPage = screen.getByText(/favorite pokémons/i);
    fireEvent.click(favoritePokemonPage);
    let pokemonInTheScreenFavorites = screen.getByTestId(pokemonTestID);
    expect(pokemonInTheScreenDetails).toStrictEqual(pokemonInTheScreenFavorites);
    const homePage = screen.getByText(/home/i);
    fireEvent.click(homePage);
    const dragon = screen.getByText('Dragon');
    fireEvent.click(dragon);
    moreDetails = screen.getByText(/more details/i);
    fireEvent.click(moreDetails);
    favoriteOption = screen.getByText(/pokémon favoritado?/i);
    fireEvent.click(favoriteOption);
    favoritePokemonPage = screen.getByText(/favorite pokémons/i);
    fireEvent.click(favoritePokemonPage);
    pokemonInTheScreenFavorites = screen.getAllByTestId(pokemonTestID);
    expect(pokemonInTheScreenFavorites).toHaveLength(2);
  });
  it('No card appears when there is no favorite pokémon', () => {
    render(<FavoritePokemons />);
    const pokemonTestID = 'pokemon-name';
    expect(screen.queryByTestId(pokemonTestID)).not.toBeInTheDocument();
  });
});
