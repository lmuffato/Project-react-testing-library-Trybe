import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App component', () => {
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
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('shows the Navigation menu', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');

    const home = getByText(/home/i);
    expect(home).toBeInTheDocument();

    const about = getByText(/about/i);
    expect(about).toBeInTheDocument();

    const FavoritePokemon = getByText(/favorite pokémons/i);
    expect(FavoritePokemon).toBeInTheDocument();
  });

  test('full app rendering/navigating', async () => {
    const {
      getByText,
      history,
    } = renderWithRouter(<App />);
    history.push('/about');

    const navigateAbout = getByText(/About Pokédex/i);
    expect(navigateAbout).toBeInTheDocument();

    await history.push('/');

    const navigateHome = getByText(/Encountered pokémons/i);
    expect(navigateHome).toBeInTheDocument();
  });

  test('Heading is rendered with text Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const heading = getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });
});
