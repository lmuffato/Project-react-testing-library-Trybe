import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter'; // --- helper para ajudar com testes usando rotas
import App from '../App';

import data from '../data';

// codigo escrito com ajuda de 'Wanderson Sales' T-10.

describe('Testa o componente <Pokedex />', () => {
  test('verifica se é renderizadoum h2 com o texto \'Encountered Pokémon\'', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = getByRole('heading', { name: 'Encountered pokémons', level: 2 });

    expect(heading).toBeInTheDocument();
  });

  describe(`testa se o proximo pokemon é renderizado ao clicar no botao de 
  proximo pokemon`, () => {
    test('verifica se o texto do botao é \'Próximo pokémon\'', () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const button = getByTestId('next-pokemon');
      expect(button).toBeInTheDocument();

      const text = getByText(/Próximo pokémon/i);
      expect(text).toBeInTheDocument();
    });

    test('verifica se existe um botao com texto \'All\'', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const textButton = getByText(/all/i);
      expect(textButton).toBeDefined();
    });

    test('verifica se ha botoes de filtro por categoria', () => {
      const { getAllByTestId } = render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const button = getAllByTestId('pokemon-type-button');
      expect(button).toBeDefined();
    });

    test('verifica se existe um botão para cada categoria e o botao para todos', () => {
      const { getAllByRole } = renderWithRouter(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const types = ['All', ...new Set(data.map((p) => p.type))];
      const length = 7;
      expect(types.length).toBe(length + 1);

      types.forEach((type) => {
        const typeCaseInsensitive = new RegExp(type, 'i');
        const button = getAllByRole('button', { name: typeCaseInsensitive });

        expect(button.length).toBe(1);
        expect(button[0]).toBeInTheDocument();
        expect(button[0]).toHaveTextContent(typeCaseInsensitive);
      });
    });

    test(`verifica se os botoes de filtragem de pokemons
     estao filtrando corretamente`, () => {
      const { getByRole, getByTestId } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );

      const buttonAll = getByRole('button', { name: 'All' });

      const nextPokemon = getByRole('button', { name: /próximo pokémon/i });

      let cur;
      data.forEach((pokemon) => {
        cur = getByTestId('pokemon-name');
        expect(cur).toHaveTextContent(pokemon.name);
        userEvent.click(nextPokemon);
      });

      userEvent.click(buttonAll);
    });
  });
});
