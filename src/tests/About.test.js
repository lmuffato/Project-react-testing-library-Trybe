import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Component About.js tests', () => {
  test('There is a h2 heading with text About Pokedex', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const heading = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('There are two paragraphs', () => {
    const { getByText } = render(<About />);

    const paragraph1 = getByText(/This application simulates a Pokédex/);

    const paragraph2 = getByText(/One can filter Pokémons by type/);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  // Implementação baseada no post do link https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  // Porém adaptado para utilizar toMatch
  test('There is an certain img', () => {
    const { getByRole } = render(<About />);

    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/800px-Gen_I_Pok%C3%A9dex.png/);
  });
});
