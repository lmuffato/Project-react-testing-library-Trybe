import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const favoritePokemonIds = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
const eight = 8;

it('a página deve conter um h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const h2Text = screen.getByText('Encountered pokémons');
  expect(h2Text).toBeInTheDocument();
});

it('deve mostrar o próximo pokémon ao clicar no botão próximo pokémon', () => {
  const { getByTestId, getAllByText, getAllByRole } = renderWithRouter(
    <App
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonIds }
    />,
  );

  const moreDetails = 'More details';
  const pikachuPath = '/pokemons/25';
  let actualPokemon = getAllByText(moreDetails);
  expect(actualPokemon[0].attributes[0].value).toBe(pikachuPath);

  const nextButton = getByTestId('next-pokemon');
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toHaveTextContent('Próximo pokémon');
  userEvent.click(nextButton);

  actualPokemon = getAllByText(moreDetails);
  expect(actualPokemon[0].attributes[0].value).toBe('/pokemons/4');
  expect(actualPokemon).toHaveLength(1);

  const nine = 9;
  for (let i = 1; i < nine; i += 1) {
    userEvent.click(nextButton);
  }
  actualPokemon = getAllByText(moreDetails);
  expect(actualPokemon[0].attributes[0].value).toBe(pikachuPath);
  const pokeName = getByTestId('pokemon-name');
  expect(pokeName).toBeInTheDocument();
  const allBtn = getAllByRole('button');
  const filterBtn = allBtn.filter((button) => button.innerHTML !== 'Próximo pokémon');
  expect(filterBtn).toHaveLength(eight);
  filterBtn.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
  const fireBtn = filterBtn.filter((btn) => btn.innerHTML === 'Fire');
  userEvent.click(fireBtn[0]);
  const filteredPokemons = pokemons.filter((poke) => poke.type === 'Fire');
  expect(filteredPokemons).toHaveLength(2);

  userEvent.click(allBtn[0]);
  actualPokemon = getAllByText(moreDetails);
  expect(actualPokemon[0].attributes[0].value).toBe(pikachuPath);
});

it('deve filtar os pokémons pelo tipo', () => {
  const seven = 7;

  const { getAllByTestId } = renderWithRouter(
    <App
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonIds }
    />,
  );

  const typeButtons = getAllByTestId('pokemon-type-button');
  expect(typeButtons.length).toBe(seven);
  expect(typeButtons[0]).toBeInTheDocument();
  expect(typeButtons[5]).toBeInTheDocument();
});

it('deve mostrar todos os pokémons quando clicar no botão All', () => {
  const { getByText } = renderWithRouter(
    <App
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemonIds }
    />,
  );

  const allButton = getByText('All');
  expect(allButton.type).toBe('button');
  expect(allButton).toBeInTheDocument();
});
