import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App component', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Heading is rendered with text Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const heading = getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
});
