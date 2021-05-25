import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

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
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('the top of the application has "home", "about", "favorite pokemons"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/home/i)).toBeInTheDocument();
  expect(getByText(/about/i)).toBeInTheDocument();
  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});

describe('application directions ', () => {
  it('application directed to Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('application directed to about', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('application directed to favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('application directed to not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/not-found');
    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
