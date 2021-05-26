import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Test App components', () => {
  test('renders a page with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders `Pokédex` as a heading in the main page', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the link `Home` that redirects the application to the main page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', {
      name: /Home/i,
    });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    const heading = getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the link `About` that redirects'
  + ' the application to the about page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: /About/i,
    });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const heading = getByRole('heading', {
      name: /About/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the link `Favorite Pokémons` that redirects'
  + ' the application to the favorite pokemons page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favPoke = getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favPoke).toBeInTheDocument();
    userEvent.click(favPoke);
    const heading = getByRole('heading', {
      name: /Favorite/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('redirects the application to the'
  + '`Not Found Page` when the URL typed is incorrect', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
