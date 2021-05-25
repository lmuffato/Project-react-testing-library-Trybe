import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Request 2: test componet About', () => {
  it('renders a heading whit the text `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders two paragraph', () => {
    const { getByText } = renderWithRouter(<About />);
    const one = getByText('This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons');
    expect(one).toBeInTheDocument();
    const two = getByText('One can filter Pokémons by type, '
      + 'and see more details for each one of them');
    expect(two).toBeInTheDocument();
  });

  it('rendrs image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByRole('img', {
      name: 'Pokédex',
    });
    expect(image).toHaveAttribute('src', url);
  });
});
