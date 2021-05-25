import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testing the component App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders a reading with the text `Pokédex` in the URL path `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
  });

});
