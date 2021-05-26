import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App.js Testes', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  /* https://github.com/ReactTraining/history/blob/master/docs/getting-started.md
  o link anterior foi onde encontrei a utilização do history.location no test */

  test('renderiza pagina principal na path /', () => {
    const {
      getByText,
      history: { location: { pathname } },
    } = renderWithRouter(<App />);
    const homePage = getByText(/Encountered pokémons/);
    expect(pathname).toBe('/');
    expect(homePage).toBeInTheDocument();
  });

  test('testa links Home, About e Favorite Pokémons', () => {
    const links = [
      [/Home/, /Encountered pokémons/],
      [/About/, /About Pokédex/],
      [/Favorite Pokémons/, /Favorite pokémons/],
    ];
    const { getByText } = renderWithRouter(<App />);
    links.forEach((link) => {
      const linkText = getByText(link[0]);
      expect(linkText).toBeInTheDocument();
      userEvent.click(linkText);
      const linkContent = getByText(link[1]);
      expect(linkContent).toBeInTheDocument();
    });
  });
  test('testando 404 URL not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/alguma-URL-doida');
    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
