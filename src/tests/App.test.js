import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
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

describe('Testa o componente "App"', () => {
  it(`Teste se a página principal da Pokédex é 
    renderizada ao carregar a aplicação no caminho de URL /.`, () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Pokédex/i);

    expect(home).toBeInTheDocument();
  });

  it(`Teste se o topo da aplicação contém um 
    conjunto fixo de links de navegação.`, () => {
    const { getByRole } = renderWithRouter(<App />);
    const headerNav = getByRole('navigation');

    expect(headerNav).toBeInTheDocument();

    const linkHome = getByRole('link', {
      name: /Home/i,
    });

    expect(linkHome).toBeInTheDocument();

    const linkAbout = getByRole('link', {
      name: /About/i,
    });

    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = getByRole('link', {
      name: /Favorite/i,
    });

    expect(linkFavorite).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página inicial, 
    na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { getByText, history: { location: { pathname } } } = renderWithRouter(<App />);

    userEvent.click(getByText(/Home/i));
    const pathnameHome = pathname;

    expect(pathnameHome).toBe('/');

    const home = getByText(/Pokédex/i);

    expect(home).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página de About, 
    na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/About/i));
    const pathnameAbout = history.location.pathname; // Tive que usar por extenso, pois quando eu destruturava o pahtname não atualizava e ficava sempre "/"

    expect(pathnameAbout).toBe('/about');

    const about = getByText(/About Pokédex/i);

    expect(about).toBeInTheDocument();
  });
});
