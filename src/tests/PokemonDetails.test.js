import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('tests for the PokemonDetails component', () => {
  const mew = '/pokemons/151';
  const mewLocation = 'Mew location';

  it('Test if the selected Pokémons information is shown on the screen', () => {
    const { getByText, queryByText, history } = renderWithRouter(<App />);
    history.push(mew);

    const name = getByText('Mew Details');
    const moreDetails = queryByText('More Details');

    expect(name).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('Test if page contains a heading with the text Summary', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push(mew);

    const title = getByRole('heading', { level: 2, name: 'Summary' });
    expect(title).toBeInTheDocument();

    const resume = getByText(/those people who are pure of heart/i);
    expect(resume).toBeInTheDocument();
  });

  it('Testa se contém uma seção com os mapas e a localização do pokémon', () => {
    const { getByRole, getByAltText, getByText, history } = renderWithRouter(<App />);
    history.push(mew);

    const title = getByRole('heading', { level: 2, name: 'Game Locations of Mew' });
    expect(title).toBeInTheDocument();

    const resume = getByAltText(mewLocation);
    expect(resume).toBeInTheDocument();

    const local = getByText('Faraway Island');
    expect(local).toBeInTheDocument();
  });

  it('Test if there is a section with maps containing the pokemons locations', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push(mew);

    const imgLocal = getByAltText(mewLocation);
    expect(imgLocal)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
    expect(imgLocal)
      .toHaveAttribute('alt', mewLocation);
  });

  it('Test if the user can bookmark a pokemon through the details page', () => {
    const { getByRole, getByAltText, history } = renderWithRouter(<App />);
    history.push(mew);

    const favorite = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorite);

    const star = getByAltText('Mew is marked as favorite');
    expect(star)
      .toHaveAttribute('src', '/star-icon.svg');
    expect(star)
      .toHaveAttribute('alt', 'Mew is marked as favorite');
  });
});
