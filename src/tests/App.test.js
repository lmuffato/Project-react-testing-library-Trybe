import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Tests of Requeriment 1', () => {
  test('renders a reading with the text `Pokédex`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', {
      name: /Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('testing link with text ABOUT', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();
  });

  test('testing link with text HOME', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
  });

  test('testing link with text FAVORITE POKÉMONS', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favorite).toBeInTheDocument();
  });
});
