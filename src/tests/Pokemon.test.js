import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Requiriment 06 - Testing Pokemon component', () => {
  it('a card with the information of a certain Pokémon must be rendered', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const {
        name,
        type,
        averageWeight: { value, measurementUnit },
        image,
      } = pokemon;
      const pokeName = getByTestId('pokemon-name');
      const pokeType = getByTestId('pokemon-type');
      const pokeWeight = getByTestId('pokemon-weight');
      const pokeImage = getByRole('img');
      expect(pokeName).toBeInTheDocument();
      expect(pokeName.textContent).toEqual(name);
      expect(pokeType).toBeInTheDocument();
      expect(pokeType.textContent).toEqual(type);
      expect(pokeWeight).toBeInTheDocument();
      expect(pokeWeight.textContent).toEqual(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(pokeImage).toBeInTheDocument();
      expect(pokeImage.src).toEqual(image);
      expect(pokeImage.alt).toEqual(`${name} sprite`);
      const button = getByTestId('next-pokemon');
      userEvent.click(button);
    });
  });
  it('must contain a navigation link to view details of this Pokémon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach(({ id }) => {
      const linkDetails = getByText(/More details/);
      expect(linkDetails).toBeInTheDocument();
      expect(linkDetails.pathname).toEqual(`/pokemons/${id}`);
      const button = getByTestId('next-pokemon');
      userEvent.click(button);
    });
  });
  it(`the application must be redirected to the Pokémon details
    page when clicking on the link`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { id, name } = pokemons[0];
    const linkDetails = getByText(/More details/);
    userEvent.click(linkDetails);
    const headingPage = getByText(`${name} Details`);
    expect(headingPage).toBeInTheDocument();
    expect(history.location.pathname).toEqual(`/pokemons/${id}`);
  });
  it('must contain a star in the favorite pokemons', () => {
    const { history, getByRole, getAllByRole } = renderWithRouter(<App />);
    const { name } = pokemons[0];
    const markFavorite = (id) => {
      history.push(`/pokemons/${id}`);
      const check = getByRole('checkbox');
      userEvent.click(check);
      history.push('/');
      const images = getAllByRole('img');
      expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
      expect(images[1].alt).toEqual(`${name} is marked as favorite`);
    };
    markFavorite('25');
    markFavorite('10');
  });
});
