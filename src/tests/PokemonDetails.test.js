import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

// Details Test

describe('Pokemon Details component tests', () => {
  it('renders Pokemon Details component, Components detais', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText, getByTestId } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokeInfo = pokemons.find(
      (e) => e.name === getByTestId(/pokemon-name/i).innerHTML,
    );
    const detailsLink = getByText(/More details/i);
    const detailscheck = detailsLink;
    userEvent.click(detailsLink);
    const favoriteInput = getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteInput);
    const detailsH2 = getByText(/details/i);
    const detailsH2check = detailsH2.innerHTML;
    const detailsSummary = getByText(/summary/i);
    expect(detailscheck)
      .not.toBeInTheDocument();
    expect(detailsH2check)
      .toBe(`${pokeInfo.name} Details`);
    expect(detailsSummary)
      .toBeInTheDocument();
    expect(getByText(`${pokeInfo.summary}`))
      .toBeInTheDocument();
  });
  it('renders Pokemon Details component, Route to find Pokemon', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText, getByTestId, getAllByAltText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const pokeInfo = pokemons.find(
      (e) => e.name === getByTestId(/pokemon-name/i).innerHTML,
    );
    const detailsLink = getByText(/More details/i);
    userEvent.click(detailsLink);
    const gameLocDetail = getByText(/game locations of/i);
    const gameLocDetailcheck = gameLocDetail;
    expect(gameLocDetailcheck.innerHTML).toBe(`Game Locations of ${pokeInfo.name}`);
    const favoriteInput = getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteInput);
    pokeInfo.foundAt.forEach((textLocation) => {
      expect(getByText(`${textLocation.location}`)).toBeInTheDocument();
    });
    const pokeImgInfo = getAllByAltText(`${pokeInfo.name} location`);
    pokeImgInfo.forEach((e) => {
      expect(e.src).not.toBe('');
      expect(e.alt).not.toBe('');
    });
  });
  it('renders Pokemon Details component, checkbox', () => {
    const history = createMemoryHistory();
    const { getByText, getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const detailsLink = getByText(/More details/i);
    userEvent.click(detailsLink);
    const favoriteInput = getByRole('checkbox');
    let favoriteInputCheck = favoriteInput;
    expect(favoriteInputCheck).toBeInTheDocument();
    expect(favoriteInputCheck).not.toBeChecked();
    userEvent.click(favoriteInput);
    favoriteInputCheck = favoriteInput;
    expect(favoriteInputCheck).toBeChecked();
  });
});
