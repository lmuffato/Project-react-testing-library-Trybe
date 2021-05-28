import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

test('The page contains the correct texts', () => {
  render(<About />);
  const headingText = screen.getByRole('heading', {
    level: 2,
    name: /About pokédex/i,
  });

  expect(headingText).toBeInTheDocument();

  const paragraphOneText = 'This application simulates a Pokédex,'
  + ' a digital encyclopedia containing all Pokémons';
  const paragraphTwoText = 'One can filter Pokémons by type, and see'
  + ' more details for each one of them';

  const paragraphOne = screen.getByText(paragraphOneText);
  const paragraphTwo = screen.getByText(paragraphTwoText);

  expect(paragraphOne).toBeInTheDocument();
  expect(paragraphTwo).toBeInTheDocument();
});

test('Display the image with the correct source', () => {
  render(<About />);
  const pokemonImage = screen.getByRole('img');
  const imageSource = pokemonImage.src;
  const correctSource = 'https://cdn2.bulbagarden.net/upload'
  + '/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(imageSource).toEqual(correctSource);
});
