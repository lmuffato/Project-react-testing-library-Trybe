import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';
import pokemons from '../data';

function catchPokemonDetails() {
  const pokeName = screen.getByTestId('pokemon-name');
  const pokeType = screen.getByTestId('pokemon-type');
  const pokeWeight = screen.getByTestId('pokemon-weight');
  const pokeImage = document.querySelector('.pokemon img');
  return {
    name: pokeName,
    type: pokeType,
    weight: pokeWeight,
    image: pokeImage,
  };
}

test('The information from the selected pokemon'
+ ' is showed in the page', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  const normalPokeTypeButton = screen.getByRole('button', {
    name: /normal/i,
  });
  const { name } = catchPokemonDetails();

  userEvent.click(normalPokeTypeButton);
  const pokeDetailsLink = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(pokeDetailsLink);

  const headingText = screen.getByRole('heading', {
    name: `${name.innerHTML} Details`,
  });
  const sumaryText = screen.getByRole('heading', {
    name: /summary/i,
  });

  const pokemonExpectedResume = 'What sounds like its cry may actually be its'
  + ' snores or the rumblings of its hungry belly.';
  const pokemonResume = screen.getByText(pokemonExpectedResume);

  //  EXPECTS
  expect(headingText).toBeInTheDocument();
  expect(pokeDetailsLink).not.toBeInTheDocument();
  expect(sumaryText).toBeInTheDocument();
  expect(pokemonResume).toBeInTheDocument();
});

it('Exists a section with the maps containing'
+ ' the locations of the pokemon', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  const { name } = catchPokemonDetails();
  const { foundAt } = pokemons.find((poke) => (poke.name === name.innerHTML));
  const locationsInPage = document.querySelectorAll('.pokemon-habitat div');

  const locationsHeadingText = screen.getByRole('heading', {
    level: 2,
    name: `Game Locations of ${name.innerHTML}`,
  });

  locationsInPage.forEach((location, index) => {
    const locationName = foundAt[index].location;
    const mapUrl = foundAt[index].map;
    const locationEl = screen.getByText(locationName);
    const mapEl = screen.getByAltText(`${name.innerHTML} location`);

    expect(locationEl).toBeInTheDocument();
    expect(mapEl).toBeInTheDocument();
    expect(mapEl.src).toEqual(mapUrl);
  });

  //  EXPECTS
  expect(locationsHeadingText).toBeInTheDocument();
  expect(locationsInPage.length).toEqual(foundAt.length);
});

it('User can fav a pokemon from the details page', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  const favPokeCheckbox = screen.getByRole('checkbox');
  expect(favPokeCheckbox).not.toBeChecked();
  userEvent.click(favPokeCheckbox);
  expect(favPokeCheckbox).toBeChecked();

  const labelFromCheckbox = screen.getByLabelText('Pokémon favoritado?');

  //  EXPECTS
  expect(favPokeCheckbox).toBeInTheDocument();
  expect(labelFromCheckbox).toBeInTheDocument();
});
