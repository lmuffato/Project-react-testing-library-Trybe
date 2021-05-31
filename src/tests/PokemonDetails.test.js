import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests in PokemonDetails.js', () => {
  const pkmnameText = 'pokemon-name';
  const moreDetailsText = 'More details';
  it('Pokémon details appear in the screen', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsText });
    fireEvent.click(moreDetailsLink);
    const pkmName = screen.getByTestId(pkmnameText).innerHTML;
    const pkmDetailsHeading = screen.getByText(`${pkmName} Details`);
    expect(pkmDetailsHeading).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    const sumary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(sumary).toBeInTheDocument();
    const pkmParagraphPart1 = (
      'This intelligent Pokémon roasts hard berries with electricity to make them tender'
    );
    const pkmParagraphTheReturnOfTheText = ' enough to eat.';
    const pkmParagraphText = `${pkmParagraphPart1}${pkmParagraphTheReturnOfTheText}`;
    const pkmParagraph = screen.getByText(pkmParagraphText).outerHTML;
    expect(pkmParagraph).toBe(`<p>${pkmParagraphText}</p>`);
  });
  it('Contein a map with pokémon location', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsText });
    fireEvent.click(moreDetailsLink);
    const pkmName = screen.getByTestId(pkmnameText).innerHTML;
    const headingTxt = `Game Locations of ${pkmName}`;
    const LocationHeading = screen.getByRole('heading', { level: 2, name: headingTxt });
    expect(LocationHeading).toBeInTheDocument();
    const pkmLocations = screen.getAllByAltText(`${pkmName} location`);
    expect(pkmLocations).toHaveLength(2);
    expect(pkmLocations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pkmLocations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('The user can favor pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsText });
    fireEvent.click(moreDetailsLink);
    const pkmName = screen.getByTestId(pkmnameText).innerHTML;
    const labelOfCheckbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(labelOfCheckbox);
    const favoriteIcon = screen.getByAltText(`${pkmName} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    fireEvent.click(labelOfCheckbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
