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

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const tagP = screen.getAllByText(/pokémons/i);
    expect(tagP).toHaveLength(2);
    expect(tagP[0]).toHaveTextContent(/digital encyclopedia/i);
    expect(tagP[1]).toHaveTextContent(/see more details for each/i);
  });
});
