import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('2 REQUIREMENT', () => {
  test('page contains information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('page contains an h2 heading with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutText = getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('page contains two paragraphs with text about Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const text = getAllByText(/Pokémons/i);
    expect(text.length).toBe(2);
  });

  test('page contains a image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// solution to find a img src https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
