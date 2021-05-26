import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App.js tests', () => {
  test('Renders a heading with the text `Pokédex`', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const heading = getByText('Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Application is redirected to Home when its Link is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const homeLink = getByText('Home');
    fireEvent.click(homeLink);

    const heading = getByText('Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('Application is redirected to About page when its Link is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const aboutLink = getByText('About');
    fireEvent.click(aboutLink);

    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('Application is redirected to Favorites page when its Link is clicked', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const favoritesLink = getByText('Favorite Pokémons');
    fireEvent.click(favoritesLink);

    const heading = getByRole('heading', {
      name: 'Favorite pokémons',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
});
