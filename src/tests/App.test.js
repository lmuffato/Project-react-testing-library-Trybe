import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../../renderWithRouter';

describe('testing App component', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  test('redirects correctly when the links are clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText('Home'));
    expect(history.location.pathname).toBe('/');
    userEvent.click(getByText('About'));
    expect(history.location.pathname).toBe('/about');
    userEvent.click(getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
    history.push('anything');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
