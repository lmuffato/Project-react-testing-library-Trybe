import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('PokemonDetails.js', () => {
  const moreDetails = 'More details';
  const { name, summary, foundAt } = pokemons[0];
  it('verify if renders pokemon details', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const pokemonName = getByRole('heading', { name: `${name} Details` });
    expect(pokemonName).toBeInTheDocument();
    const summaryElement = getByRole('heading', { name: 'Summary' });
    expect(summaryElement).toBeInTheDocument();
    expect(summaryElement.tagName).toBe('H2');
    const pokemonSummary = getByText(`${summary}`);
    expect(pokemonSummary).toBeInTheDocument();
  });
  it('verify maps', () => {
    const { getByText,
      getByRole,
      getAllByRole,
      getAllByAltText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const pokemonLocation = getByRole('heading', { name: `Game Locations of ${name}` });
    expect(pokemonLocation).toBeInTheDocument();
    // do componente PokemonDetails:
    // <img src={ `${map}` } alt={`${name} ` + `location`} />
    foundAt.forEach((item, index) => {
      const imageMap = getAllByAltText(`${name} location`);
      expect(getByText(item.location)).toBeInTheDocument();
      expect(imageMap[index]).toBeInTheDocument();
      // index+1 porque o index é a imagem do pokemon
      expect(getAllByRole('img')[index + 1]).toHaveAttribute('src', item.map);
    });
  });

  it('verify bookmarked', () => {
    const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const labelText = getByLabelText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });
});
