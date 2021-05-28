import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Requirement 6 - testing the <Pokemon/> component', () => {
  it('Checks name pokemon correct', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const paragraphName = getByTestId('pokemon-name');
    expect(paragraphName.innerHTML).toBe('Pikachu');
  });

  it('Checks paragraph with average weight', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const paragraphAverage = getByTestId('pokemon-weight');
    expect(paragraphAverage.innerHTML).toBe('Average weight: 6.0 kg');
  });

  it('Checks paragraph with type', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const paragraphType = getByTestId('pokemon-type');
    expect(paragraphType.innerHTML).toBe('Electric');
  });

  it('Checks button "More details"', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const paragraphType = getByRole('link', { name: 'More details' });
    fireEvent.click(paragraphType);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Checks pokemon image', () => {
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const image = getByAltText('Pikachu sprite');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Checks the "alt" the star icon', () => {
    const truthy = true;
    const { getByAltText } = renderWithRouter(
      <Pokemon isFavorite={ truthy } pokemon={ pokemons[0] } />,
    );
    const alt = 'Pikachu is marked as favorite';
    const altImage = getByAltText(alt);
    expect(altImage.alt).toBe(alt);
  });

  it('Checks the "src" the star icon', () => {
    const truthy = true;
    const { getByAltText } = renderWithRouter(
      <Pokemon isFavorite={ truthy } pokemon={ pokemons[0] } />,
    );
    const alt = 'Pikachu is marked as favorite';
    const altImage = getByAltText(alt);
    expect(altImage.src).toContain('/star-icon.svg');
  });
});
