import React from 'react';
import renderWithRouter from './renderWithRouter';
import { render, screen, getByRole } from '@testing-library/react';
import App from '../App';

describe('test of the app', () => {
  test('Rendeniza na tela', () => {
    renderWithRouter(<App />);
    const title = screen.getByText('Pokédex');
    expect(title).toBeInTheDocument();
  });

/*   test('renders a reading with the text `Pokédex`', () => {
    const { getByRole } = render(<App />);
    const h1 = getByRole(heading);
    expect(screen.getByRole(heading)).toBeInTheDocument();
  }); */
  /* test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  }); */
});
