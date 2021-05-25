import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test of app, render and nav', () => {
  test('Rendeniza na tela', () => {
    renderWithRouter(<App />);
    const title = screen.getByText('Pokédex');
    expect(title).toBeInTheDocument();
  });
  test('Encontra os links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
});
