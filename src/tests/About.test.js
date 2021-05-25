import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.helper';
import About from '../components/About';

describe('Requisito 2', () => {
  test('A página contém um heading h2 com o texto `About Pokédex`', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading');
    expect(aboutPokedex).toBeInTheDocument();
    expect(aboutPokedex).toHaveTextContent(/about pokédex/i);
  });
});
