import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('testa se contém subtítulo e paragráfo', () => {
  render(<About />);
  const heading = screen.getByText('About Pokédex');
  expect(heading).toBeInTheDocument();

  const paragraphOn = screen
    .getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
  const paragraphTwo = screen
    .getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');

  expect(paragraphOn).toBeInTheDocument();
  expect(paragraphTwo).toBeInTheDocument();
});

test('testa se contém uma imagem', () => {
  render(<About />);
  const image = screen.getByRole('img');
  const imageSoruce = image.src;
  const source = 'https://cdn2.bulbagarden.net/upload'
  + '/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(imageSoruce).toEqual(source);
});
