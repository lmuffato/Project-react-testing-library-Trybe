import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from '../App';

describe('Testes do componente Pokedex - Heading', () => {
  test('Testa se a página possui um h2', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/Encountered Pokémons/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('Testes do componente Pokedex - Botão', () => {
  test('Testa se é exibido o próximo pokemon quando o botão é clicado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const nextBtn = screen.getByText(/Próximo pokémon/i);
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
  });
});

describe('Testes do componente Pokedex - Teste se tem os botões de filtro', () => {
  test('Testa se o texto do botão corresponde ao nome do tipo', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const psychicBtn = screen.getByText(/Psychic/i);
    expect(psychicBtn).toBeInTheDocument();
  });
  test('Testa se tem um botão para resetar o filtro - ALL', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const allBtn = screen.getByText(/All/);
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(screen.getByText(/Pikachu/i));
  });
});

describe('Testes do componente Pokedex - filtros', () => {
  test('Testa se é criado um botão de filtro para cada tipo', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const fireBtn = screen.getByText(/Fire/i);
    const psychicBtn = screen.getByText(/Psychic/i);
    const electricBtn = screen.getAllByText(/Electric/i);
    const bugBtn = screen.getByText(/Bug/i);
    const poisonBtn = screen.getByText(/Poison/i);
    const dragonBtn = screen.getByText(/Dragon/i);
    const normalBtn = screen.getByText(/Normal/i);
    expect(fireBtn).toBeDefined();
    expect(psychicBtn).toBeDefined();
    expect(electricBtn).toBeDefined();
    expect(bugBtn).toBeDefined();
    expect(poisonBtn).toBeDefined();
    expect(dragonBtn).toBeDefined();
    expect(normalBtn).toBeDefined();
  });
  test('Testa pokemons type buttons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const typteBtn = screen.getAllByTestId(/pokemon-type-button/);
    expect(typteBtn).toBeDefined();
  });
});
