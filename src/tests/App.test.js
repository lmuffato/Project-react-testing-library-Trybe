import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('verifica links da home', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkHome = getByText('Home');
  expect(linkHome).toBeInTheDocument();
  const linkAbout = getByText('About');
  expect(linkAbout).toBeInTheDocument();
  const linkFavoritePok = getByText('Favorite Pokémons');
  expect(linkFavoritePok).toBeInTheDocument();
});

test('verifica implementação do botão home', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  const homeButton = getByRole('link', {
    name: 'Home',
  });
  fireEvent.click(homeButton);
  expect(heading).toBeInTheDocument();
});

test('verifica implementação do botão about', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const aboutButton = getByRole('link', {
    name: 'About',
  });
  fireEvent.click(aboutButton);
  const abouting = getByText('About Pokédex');
  expect(abouting).toBeInTheDocument();
});

test('verifica implementação do botão favorite pokémons', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const favoritesButton = getByRole('link', {
    name: 'Favorite Pokémons',
  });
  fireEvent.click(favoritesButton);
  const favorites = getByText('Favorite pokémons');
  expect(favorites).toBeInTheDocument();
});

test('verifica implementação do componente Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/nao-encontrada');
  const notFound = getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});
