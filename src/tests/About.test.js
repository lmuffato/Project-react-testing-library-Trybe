// import userEvent from '@testing-library/user-event';
import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

it('renders a reading with the text `About Pokedex`', () => {
  const { getByRole } = renderWithRouter(<About />);
  const aboutPage = getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(aboutPage).toBeInTheDocument();
});
