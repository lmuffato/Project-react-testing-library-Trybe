import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

describe('2 - Testing the component <About />', () => {
  test('the page must have a heading h2 with the text \'About Pokédex\'', () => {
    render(<About />);

    const aboutHeading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('the page must have two paragraphs', () => {
    render(<About />);

    const paragraphs = document.querySelectorAll('p');
    const paragraphsLength = 2;

    expect(paragraphs.length).toBe(paragraphsLength);
  });

  test('the page must have a image with a specific source', () => {
    render(<About />);

    const image = screen.getByRole('img', { name: /pokédex/i });
    const imageSource = (
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    );

    expect(image.src).toBe(imageSource);
  });
});
