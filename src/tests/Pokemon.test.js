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

it('Renders a card with the informations'
+ ' from a pokemon', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  const normalPokeTypeButton = screen.getByRole('button', {
    name: /normal/i,
  });

  userEvent.click(normalPokeTypeButton);

  const averageWeightTextModel = 'Average weight: 460.0 kg';
  const pokemonDetails = catchPokemonDetails();
  const pokeName = pokemonDetails.name.innerHTML;
  const pokeImageSrc = 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png';

  expect(pokemonDetails.name).toHaveTextContent('Snorlax');
  expect(pokemonDetails.type).toHaveTextContent('Normal');
  expect(pokemonDetails.weight).toHaveTextContent(averageWeightTextModel);
  expect(pokemonDetails.image.src).toEqual(pokeImageSrc);
  expect(pokemonDetails.image.alt).toEqual(`${pokeName} sprite`);
});

it('Renders a link in the card'
  + ' and it contains the pokemon Id', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  const pokemonDetails = catchPokemonDetails();

  const { id } = pokemons.find(({ name }) => name === pokemonDetails.name.innerHTML);

  const pokeDetailsLink = screen.getByRole('link', {
    name: /more details/i,
  });
  const detailsLinkQueriedId = pokeDetailsLink.href;
  const re = RegExp(`${id}`, 'gi');
  const queriedIdMatchesPokeId = detailsLinkQueriedId.match(re);

  expect(pokeDetailsLink).toBeInTheDocument();
  expect(queriedIdMatchesPokeId).toBeTruthy();
});

it('Redirects the user to the Details page with'
+ ' the link contaning the Id whose pokemon'
+ ' that it wants to see the details', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  const { name } = catchPokemonDetails();

  const foundPoke = pokemons.find((poke) => poke.name === name.innerHTML);
  const re = RegExp(`${foundPoke.id}`, 'gi');

  const pokeDetailsLink = screen.getByRole('link', {
    name: /more details/i,
  });

  userEvent.click(pokeDetailsLink);

  const { pathname } = historyMock.location;
  const pathnameContainsThePokemonId = pathname.match(re);
  const isUserInPageDetails = pathname.match(/pokemons/gi);

  const detailsHeadingText = screen.getByRole('heading', {
    level: 2,
    name: `${foundPoke.name} Details`,
  });

  expect(pathnameContainsThePokemonId).toBeTruthy();
  expect(isUserInPageDetails).toBeTruthy();
  expect(detailsHeadingText).toBeInTheDocument();
});

it('Favorited Pokemons have a star in your card', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  historyMock.push('/');

  const pokeDetailsLink = screen.getByRole('link', {
    name: /more details/i,
  });

  userEvent.click(pokeDetailsLink);

  const name = screen.getByTestId('pokemon-name');
  const pokeName = name.innerHTML;

  const favPokeCheckbox = screen.getByRole('checkbox');
  userEvent.click(favPokeCheckbox);

  const favStarIcon = document.querySelector('.favorite-icon');

  expect(favStarIcon).toBeInTheDocument();
  expect(favStarIcon.src).toEqual('http://localhost/star-icon.svg');
  expect(favStarIcon.alt).toEqual(`${pokeName} is marked as favorite`);
});
