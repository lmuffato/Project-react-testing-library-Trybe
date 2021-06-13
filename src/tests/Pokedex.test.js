import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
// import Pokedex from '../components/Pokedex';
import RenderWithRouter from './RenderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se contém um heading h2 com o texto Encountered pokémons', () => {
    RenderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
});
