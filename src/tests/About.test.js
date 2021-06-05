import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('about page should contains info about Pokédex', () => {
  render(<About />);
  const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
  const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test('should about heading contains H2 About Pokédex text', () => {
  render(<About />);
  const heading = screen.getByRole('heading', { level: 2 });

  expect(heading.textContent).toBe('About Pokédex');
});

test('should About page contains Pokédex image', () => {
  render(<About />);
  const getImage = screen.getByAltText(/Pokédex/);
  const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(getImage.src).toContain(imageSrc);
});
