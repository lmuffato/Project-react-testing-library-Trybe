import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('Testa se a página contém as infos sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });
});
