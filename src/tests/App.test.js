import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Requisito 1', () => {
  it('Teste se a página principal da Pokédex é renderizada', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const home = getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();

    const about = getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();

    const favoritePokemons = getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemons).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página 
  inicial, na URL / ao clicar no link Home da barra de navegação`, () => {
    const historyMock = createMemoryHistory();

    const { getByRole } = render(
      <MemoryRouter history={ historyMock }>
        <App />
      </MemoryRouter>,
    );

    const home = getByRole('link', { name: /Home/i });
    userEvent.click(home);

    historyMock.push('/');
  });
});
