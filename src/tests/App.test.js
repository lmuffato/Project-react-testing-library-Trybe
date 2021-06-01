import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const heading = getByRole('heading', {
    name: /Pokédex/i,
    level: 1,
  });
  expect(heading).toBeInTheDocument();
});

describe('tests navigation links', () => {
  test('home link', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByText(/home/i);
    userEvent.click(linkHome);
    const linkHomeText = getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(linkHomeText).toBeInTheDocument();
  });

  test('about link', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = getByText(/about/i);
    userEvent.click(linkAbout);
    const textAboutPage = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(textAboutPage).toBeInTheDocument();
  });

  test('favorite pokémons link', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoritePokemonsLink = getByText(/favorite pokémon/i);
    userEvent.click(favoritePokemonsLink);
    const favoritePokemonsPage = getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(favoritePokemonsPage).toBeInTheDocument();
  });

  test('tests page Not Found', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/not-found-route');
    const pageNotFound = getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
});
