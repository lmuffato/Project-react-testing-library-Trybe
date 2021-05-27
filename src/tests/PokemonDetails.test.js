import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Test the <PokemonDetails.js /> component', () => {
  const pikachuPath = '/pokemons/25';
  it('Test if the information for the selected Pokémon is shown.', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const linkToDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkToDetails);
    const path = history.location.pathname;
    expect(path).toBe(pikachuPath);
    const heading = getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(heading).toBeInTheDocument();
    expect(linkToDetails).not.toBeInTheDocument();
    expect(getByRole('heading', {
      name: /summary/i,
      level: 2,
    })).toBeInTheDocument();
    expect(getByText(/this intelligent pokémon/i)).toBeInTheDocument();
  });
  it('Test if the page contains maps with the location of the pokémon', () => {
    const { getByRole, getAllByAltText,
      getByText, container } = renderWithRouter(<App />);
    const linkToDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkToDetails);
    const pokemonHabitat = container.querySelector('.pokemon-habitat');
    expect(pokemonHabitat).toBeInTheDocument();
    const maps = getAllByAltText(/pikachu location/i);
    expect(maps[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(maps[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(maps[1]).toHaveAttribute('alt', 'Pikachu location');
    const heading = getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    const location1 = getByText(/kanto power plant/i);
    const location2 = getByText(/kanto viridian forest/i);
    expect(pokemonHabitat).toContainElement(maps[0]);
    expect(pokemonHabitat).toContainElement(maps[1]);
    expect(pokemonHabitat).toContainElement(location1);
    expect(pokemonHabitat).toContainElement(location2);
  });

  it('Test if the user can favor a pokémon through the details page.', () => {
    const { getByRole, getByLabelText, getByText } = renderWithRouter(<App />);
    const linkToDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkToDetails);
    const favorite = getByLabelText(/pokémon favoritado\?/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const favoriteLink = getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(favoriteLink);
    expect(getByRole('heading', {
      name: /favorite pokémons/i,
    })).toBeInTheDocument();
    expect(getByText(/pikachu/i)).toBeInTheDocument();

    expect(favorite).toBeChecked();

    userEvent.click(getByRole('link', {
      name: /home/i,
    }));
  });

  it(`Alternate clicks in the checkbox should add and
   remove the Pokémon from the list of favorites, respectively`, () => {
    const { getByRole, queryByText, history } = renderWithRouter(<App />);

    history.push(pikachuPath);
    const favorite = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.dblClick(favorite);
    expect(favorite).toBeChecked();

    history.push('/favorites');
    const pokemon = queryByText(/no favorite pokemon found/i);
    expect(pokemon).not.toBeInTheDocument();

    history.push(pikachuPath);
    userEvent.click(favorite);
    expect(favorite).not.toBeChecked();
  });
});
