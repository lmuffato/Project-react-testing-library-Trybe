import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import About from '../components/About';

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

  test('renders a reading with the text `about`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('link', {
      name: /about/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
