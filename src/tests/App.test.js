import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test if the home page', () => {
  it('renders a heading with the text `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe('Test if renders nav links', () => {
  it('renders home link', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/home/i);
    userEvent.click(homeLink);
    const homeText = getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(homeText).toBeInTheDocument();
  });
  it('renders about link', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const aboutLink = getByText(/about/i);
    userEvent.click(aboutLink);
    const aboutPageText = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutPageText).toBeInTheDocument();
  });
  it('renders Favorite Pokémons link', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const favPokemonsLink = getByText(/favorite pokémons/i);
    userEvent.click(favPokemonsLink);
    const favPageText = getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });
    expect(favPageText).toBeInTheDocument();
  });
});

describe('Test if renders a not found page when doesnt find a correct way', () => {
  it('renders not found text', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/not-found-route');
    const notFoundText = getByText(/page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
