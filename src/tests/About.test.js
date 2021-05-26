import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { About } from '../components';

describe('2 - Testing the <About /> component', () => {
  test('the page /about must have a heading h2 with the text \'About Pokédex\'', () => {
    const { history } = renderWithRouter(<About />);

    history.push('/about');
    const { location: { pathname } } = history;
    const aboutHeading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(pathname).toBe('/about');
    expect(aboutHeading).toBeInTheDocument();
  });

  test('the page /about must have two paragraphs', () => {
    const { history } = renderWithRouter(<About />);

    history.push('/about');
    const paragraphs = document.querySelectorAll('p');
    const paragraphsLength = 2;

    expect(paragraphs.length).toBe(paragraphsLength);
  });

  test('the page /about must have a image with a specific source', () => {
    const { history } = renderWithRouter(<About />);

    history.push('/about');
    const image = screen.getByRole('img', { name: /pokédex/i });
    const imageSource = (
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    );

    expect(image.src).toBe(imageSource);
  });
});
