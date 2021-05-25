import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testing the <App.js /> component', () => {
  test('renders a reading with the text \'Pokédex\'', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the home page when the route is \'/\'', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    const homePageText = getByText(/Encountered pokémons/i);

    expect(pathname).toBe('/');
    expect(homePageText).toBeInTheDocument();
  });

  test('the application contains a fixed set of nagivation links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const navigationLinks = getAllByRole('link');
    const firstLink = navigationLinks[0];
    const secondLink = navigationLinks[1];
    const thirdLink = navigationLinks[2];

    expect(firstLink.textContent).toBe('Home');
    expect(secondLink.textContent).toBe('About');
    expect(thirdLink.textContent).toBe('Favorite Pokémons');
  });
});
