import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
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

  test('testando se rota esta em /', () => {
    const history = createMemoryHistory();
    history.push('/');

    const { container } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    expect(container.innerHTML).toMatch(/Pokédex/i);
  });
});
