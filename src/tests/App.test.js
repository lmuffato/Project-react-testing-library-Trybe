import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Renders routes perfectly', () => {
  test('renders /Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeBtn = getByText(/home/i);
    userEvent.click(homeBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('renders /About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutBtn = getByText(/about/i);
    userEvent.click(aboutBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('renders /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favoritesBtn = getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoritesBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
