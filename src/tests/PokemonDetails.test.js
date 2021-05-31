import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests in PokemonDetails.js', () => {
  it('Pokemon details appear in the screen', () => {
    /* const { history } =  */renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsLink);
    const pkmName = screen.getByTestId('pokemon-name').innerHTML;
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
    console.log(pkmParagraph);
    expect(pkmParagraph).toBe(`<p>${pkmParagraphText}</p>`);
  });
});
