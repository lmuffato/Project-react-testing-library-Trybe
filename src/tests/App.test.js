import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.helper';
import App from '../App';

describe('Requisite 1', () => {
  test('Renders a hearding with the text `Pokédex`', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const headingPokedex = screen.getByRole('heading', { level: 1 });
    expect(headingPokedex).toBeInTheDocument();
    expect(headingPokedex).toHaveTextContent(/pokédex/i);
  });
});
