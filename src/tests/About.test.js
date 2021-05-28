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
    expect(p.length).toBe(2);
  });
});
