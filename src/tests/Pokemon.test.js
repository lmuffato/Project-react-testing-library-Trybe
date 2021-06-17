import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

describe('NotFound component tests', () => {
  it('renders Pokemon component, Right Pokemons Name and Type', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId, getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    // fon
    userEvent.click(getByText(/home/i));
    expect(history.location.pathname).toBe('/');
    const pokeName = getByTestId(/pokemon-name/i);
    const pokeType = getByTestId(/pokemonType/i);
    const pokeweight = getByTestId(/pokemon-weight/i);
    const pokeSprite = getByRole('img');
    let pokeCheck = pokeName;
    const pokeInfo = pokemons.find((e) => e.name === pokeCheck.innerHTML);
    expect(pokeInfo.name).toBe(pokeCheck.innerHTML);
    pokeCheck = pokeType;
    expect(pokeInfo.type).toBe(pokeCheck.innerHTML);
    pokeCheck = pokeweight;
    const miniWeightInfo = `${pokeInfo.averageWeight.value} ${
      pokeInfo.averageWeight.measurementUnit}`;
    const pokeInfoWeight = `Average weight: ${miniWeightInfo}`;
    expect(pokeCheck.innerHTML).toBe(pokeInfoWeight);
    pokeCheck = pokeSprite.src;
    expect(pokeCheck).toBe(pokeInfo.image);
    pokeCheck = pokeSprite.alt;
    expect(pokeCheck).toBe(`${pokeInfo.name} sprite`);
  });
  it('renders Pokemon component, Have link to Pokemon Details', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsLink = getByText(/More details/i);
    const pokeInfo = pokemons.find(
      (e) => e.name === getByTestId(/pokemon-name/i).innerHTML,
    );
    const checkLink = detailsLink;
    expect(checkLink.href)
      .toBe(`http://localhost/pokemons/${pokeInfo.id}`);
  });
  it('renders Pokemon component, Link should Redirect to detail page', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsLink = getByText(/More details/i);
    userEvent.click(detailsLink);
    const checkLink = detailsLink;
    expect(checkLink.href)
      .toBe(`http://localhost${history.location.pathname}`);
  });
  it('renders Pokemon component, Pathname should be same as poke id', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsLink = getByText(/More details/i);
    userEvent.click(detailsLink);
    const pokeInfo = pokemons.find(
      (e) => e.name === getByTestId(/pokemon-name/i).innerHTML,
    );
    expect(`/pokemons/${pokeInfo.id}`)
      .toBe(`${history.location.pathname}`);
  });
  it('renders Pokemon component, should have star img', () => {
    const history = createMemoryHistory();
    const { getByText, getAllByRole, getByLabelText, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokeInfo = pokemons.find(
      (e) => e.name === getByTestId(/pokemon-name/i).innerHTML,
    );
    const detailsLink = getByText(/More details/i);
    userEvent.click(detailsLink);
    const favoriteInput = getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteInput);
    const starImg = getAllByRole('img');
    const starImgCheck = starImg[1];
    expect(starImgCheck.src)
      .toBe('http://localhost/star-icon.svg');
    expect(starImgCheck.alt)
      .toBe(`${pokeInfo.name} is marked as favorite`);
  });
});
