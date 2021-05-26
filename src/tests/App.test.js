import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('app test', () => {
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

  test('Teste conjunto fixo de links de navegação', () => {
    RenderWithRouter(<App />);

    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Home');
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('About');
    expect(screen.getAllByRole('link')[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('renderiza pagina home', () => {
    const { history } = RenderWithRouter(<App />);
    const home = screen.getAllByRole('link')[0];
    userEvent.click(home);
    console.log(history);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('renderiza pagina about', () => {
    const { history } = RenderWithRouter(<App />);
    const about = screen.getAllByRole('link')[1];
    userEvent.click(about);

    const { location: { pathname } } = history;
    console.log(pathname);
    expect(pathname).toBe('/about');
  });

  test('renderiza pagina Favorite Pokémons', () => {
    const { history } = RenderWithRouter(<App />);
    const favorites = screen.getAllByRole('link')[2];
    userEvent.click(favorites);
    console.log(history);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
