import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('test the app.js route and navigation', () => {
  it('test the main path', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('test the existence of the links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
});

describe('test the navigation links', () => {
  it('test the home link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: /home/i,
    });
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('test the about link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: /about/i,
    });
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('test the favorite link', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
