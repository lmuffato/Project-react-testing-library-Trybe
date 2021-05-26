import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Tests whether the information about the pokedex is rendered', () => {
  it('Renders a header with the text About Pokedex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('Renders paragraphs', () => {
    renderWithRouter(<About />);
    const text1Part1 = 'This application simulates a Pokédex, ';
    const text1Part2 = 'a digital encyclopedia containing all Pokémons';
    const text2Part1 = 'One can filter Pokémons by type, ';
    const text2Part2 = 'and see more details for each one of them';
    const text1Regex = new RegExp(`${text1Part1}${text1Part2}`, 'i');
    const text2Regex = new RegExp(`${text2Part1}${text2Part2}`, 'i');
    const paragraphy1 = screen.getByText(text1Regex);
    const paragraphy2 = screen.getByText(text2Regex);
    expect(paragraphy1).toBeInTheDocument();
    expect(paragraphy2).toBeInTheDocument();
  });
});
