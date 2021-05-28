import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Testing <About />', () => {
  test('Test tag <h2> with text "About Pokedex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test('Test number of paragraphs', () => {
    const { container } = renderWithRouter(<About />);
    const p = container.querySelectorAll('p');
    // extracted from https://stackoverflow.com/questions/54234515/get-by-html-element-with-react-testing-library
    expect(p.length).toBe(2);
  });

  test('Test Pokédex image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
