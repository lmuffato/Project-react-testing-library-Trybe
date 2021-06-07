import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter ';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('testa o componente <App.js />', () => {
  test('testa se o primeiro link existe testos Home', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const meulink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(meulink);
    const homeText = getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(homeText).toBeInTheDocument();
  });
  it('renders about link', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutLink = getByText(/about/i);
    userEvent.click(aboutLink);
    const aboutPageText = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutPageText).toBeInTheDocument();
  });
  it('renders Favorite Pokémons link', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
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
