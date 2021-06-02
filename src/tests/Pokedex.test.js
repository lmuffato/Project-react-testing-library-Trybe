import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes sobre componente Pokedex.', () => {
  it('Testa a existência de uma tag H2 com texto: "Encountered pokémons".', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2Tag = getByText(/Encountered pokémons/i);
    expect(h2Tag).toBeInTheDocument();
  });

  it('Deve haver um botão com o texto: "Próximo Pokemon"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const botao = getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(botao).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const botao = getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(botao);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    for (let i = 0; i < (pokemons.length - 1); i += 1) {
      userEvent.click(botao);
    }
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  it('Testa se há um botões de filtro.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const botaoFiltro = getAllByTestId('pokemon-type-button');
    expect(botaoFiltro[0]).toHaveTextContent('Electric');
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });
});
