import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('1. Testando componente <App />', () => {
  test('página principal da Pokédex é renderizada ao carregar a aplicação em /`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();

    const aboutLink = getByText('About');
    expect(aboutLink).toBeInTheDocument();

    const favLink = getByText('Favorite Pokémons');
    expect(favLink).toBeInTheDocument();
  });

  test('o app é redirecionado para / ao clicar em Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText('Home');
    userEvent.click(homeLink);
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('o app é redirecionado para /about ao clicar em About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = getByText('About');
    userEvent.click(aboutLink);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('o app é redirecionado para /favorites ao clicar em Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favLink = getByText(/Favorite Pokémons/i);
    userEvent.click(favLink);
    const heading = getByText('No favorite pokemon found');
    expect(heading).toBeInTheDocument();
  });

  test('o app é redirecionado para Not Found ao entrar em uma URL desconhecida', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const history = createMemoryHistory();
    history.push('/xablau');
    const notFoundMsg = getByRole('heading', { level: 2 });
    expect(notFoundMsg).toBeInTheDocument();
  });
});
