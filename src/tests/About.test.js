import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { About } from '../components';

describe('testing the component <About />', () => {
  test('text information about pokédex', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const containingText = screen.getByText(/encyclopedia containing/i);

    expect(containingText).toBeInTheDocument();
  });

  test('h2 with /about pokedex/ text', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const aboutTitle = screen.getByRole('heading',
      {
        name: /about pokédex/i,
        level: 2,
      });

    expect(aboutTitle).toBeInTheDocument();
  });

  test('render information text into two <p> tags', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const containingWord = screen.getAllByText(/pokémons/i);

    expect(containingWord.length).toBe(2);
  });

  test('renders the pokédex image', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    const img = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});

// ref https://medium.com/@drake_beth/how-to-test-images-in-react-a70053b1634a
