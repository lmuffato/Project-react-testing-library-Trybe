import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Test the "App" component - Requirement 1', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('check the navigation links', () => {
    // Acessar os elementos da sua tela
    const { getAllByRole } = renderWithRouter(<App />);
    const navElement = getAllByRole('link');
    // Interagir com eles (se houver necessidade)
    // Fazer seu teste
    expect(navElement[0]).toHaveTextContent('Home');
    expect(navElement[1]).toHaveTextContent('About');
    expect(navElement[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('check the "About" link path', () => {
    // Acessar os elementos da sua tela
    const { getAllByRole, history } = renderWithRouter(<App />);
    const navElement = getAllByRole('link');
    // Interagir com eles (se houver necessidade)
    userEvent.click(navElement[1]);
    // Fazer seu teste
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('check the "Favorites" link path', () => {
    // Acessar os elementos da sua tela
    const { getAllByRole, history } = renderWithRouter(<App />);
    const navElement = getAllByRole('link');
    // Interagir com eles (se houver necessidade)
    userEvent.click(navElement[2]);
    // Fazer seu teste
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('check the "Home" link path', () => {
    // Acessar os elementos da sua tela
    const { getAllByRole, history } = renderWithRouter(<App />);
    const navElement = getAllByRole('link');
    // Interagir com eles (se houver necessidade)
    userEvent.click(navElement[0]);
    // Fazer seu teste
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('check if the "Not Found" path works when an unknown URL is passed', () => {
    // Acessar os elementos da sua tela
    const { getByRole, history } = renderWithRouter(<App />);
    // Interagir com eles (se houver necessidade)
    history.push('/random-route');
    const pageNotFoundMsg = getByRole('heading', { level: 2 });
    // Fazer seu teste
    expect(pageNotFoundMsg).toHaveTextContent('Page requested not found');
  });
});

// Acessar os elementos da sua tela
// Interagir com eles (se houver necessidade)
// Fazer seu teste
