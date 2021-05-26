import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
// import renderWithRouter from './renderWithRouter';

test('Verifica se as informações sobra a Pokedex aparecem', () => {
  render(<About />);
  const h2Text = screen.getByRole('heading', {
    name: /About Pokédex/i,
  });
  expect(h2Text).toBeInTheDocument();
});

// forma de pegar link vista no stackoverflow
// https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
test('Verifica se a Pokedex é renderizada', () => {
  render(<About />);
  const Pokedex = screen.getByRole('img');
  expect(Pokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
