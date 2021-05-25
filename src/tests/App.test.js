import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica se:', () => {
  it('a página principal da Pokédex é renderizada no path "/"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = screen.getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  it('no topo há um conjunto de links de navegação, Home, About e Favorite'
    + ' Pokémons respectivamente', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('se a aplicação é redirecionada para a página inicial ao se clicar '
  + 'no link Home da barra de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getAllByRole('link')[0];
    userEvent.click(homeLink);
    const heading = screen.getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  it('se a aplicação é redirecionada para a página About ao se clicar '
  + 'no link About da barra de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutLink = screen.getAllByRole('link')[1];
    userEvent.click(aboutLink);
    const heading = screen.getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('se a aplicação é redirecionada para a página Favorite Pokémons ao se clicar '
  + 'no link Favorite Pokémons da barra de navegação', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoriteLink = screen.getAllByRole('link')[2];
    userEvent.click(favoriteLink);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/Favorite pokémons/);
  });

  it('se a aplicação é redirecionada para a página Not Found ao entrar'
  + 'numa url desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/desconheco-essa-url-man');
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Page requested not found');
  });
});
