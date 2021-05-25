import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Component', () => {
  test('Show pokedéx info', () => {
    render(<About />);
    const textInfo = screen.getByText(/this application simulates a pokédex/i);
    expect(textInfo).toBeInTheDocument();
  });

  test('Title is About Pokédex', () => {
    render(<About />);
    const title = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  test('There ara two paragraph about pokedex', () => {
    render(<About />);

    const paragraphs = screen.getAllByText(/pokémon/i);
    expect(paragraphs.length).toBe(2);
  });

  test('Has Image tag', () => {
    render(<About />);
    const imgTag = screen.getByRole('img');
    const imagePath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgTag).toBeInTheDocument();
    expect(imgTag.src).toBe(imagePath);
  });
});
