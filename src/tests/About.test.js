// import userEvent from '@testing-library/user-event';
import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

const PokedexSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

it('renders a reading with the text `About Pokedex`', () => {
  const { getByRole } = renderWithRouter(<About />);
  const aboutPage = getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(aboutPage).toBeInTheDocument();
});

it('should contains an img with src "pokedexSrc"', () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img');
  expect(image).toHaveAttribute('src', PokedexSrc);
});
