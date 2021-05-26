import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 1 - Testing Home page.', () => {
  it('should render the home page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
    const home = getByText(/Pokédex/i);
    expect(home).toBeInTheDocument();
  });
  it('should contain a navigation bar with Home, About and Favorite Pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    expect(nav).toBeInTheDocument();
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
    const aboutLink = getByText('About');
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = getByText(/Favorite Pokémons/);
    expect(favoriteLink).toBeInTheDocument();
  });
  it('should redirect to home by clicking on the link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    userEvent.click(homeLink);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });
  it('should redirect to about by clicking on the link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    userEvent.click(aboutLink);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });
  it('should redirect to page not found if it does not exist', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
