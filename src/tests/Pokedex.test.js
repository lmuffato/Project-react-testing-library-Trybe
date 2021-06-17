import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it(`Teste se página contém um heading h2
  com o texto Encountered pokémons.`, () => {
    render(<App />, { wrapper: MemoryRouter });

    const encountText = screen.getByRole('heading', { level: 2 });
    expect(encountText.innerHTML).toBe('Encountered pokémons');
  });

  it(`Teste se é exibido o próximo Pokémon da lista
        quando o botão Próximo pokémon é clicado.`, () => {
    render(<App />, { wrapper: MemoryRouter });

    const encountText2 = screen.getByText(/próximo pokémon/i);
    userEvent.click(encountText2);
    // expect(screen.getByText('')).
  });

  it(`Teste se a Pokédex tem os botões de filtro.

        A partir da seleção de um botão de tipo, 
        a Pokédex deve circular somente pelos pokémons daquele tipo;
  
        O texto do botão deve corresponder ao nome do tipo, 
        ex. Psychic;`, () => {
    render(<App />, { wrapper: MemoryRouter });
    const linkCategoryPsychic = screen.getByText(/psychic/i);
    userEvent.click(linkCategoryPsychic);

    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
  });

  it(`Teste se a Pokédex contém um botão para resetar o filtro

        O texto do botão deve ser All;

        A Pokedéx deverá mostrar os Pokémons normalmente
        (sem filtros) quando o botão All for clicado;
  
        Ao carregar a página, o filtro selecionado
        deverá ser All;`, () => {
    render(<App />, { wrapper: MemoryRouter });
    const buttonAll = screen.getByText(/all/i);
    expect(buttonAll).toBeInTheDocument();
  });

  it(`Teste se é criado, dinamicamente, um botão de 
      filtro para cada tipo de Pokémon.`, () => {
    const { getByText } = render(<App />, { wrapper: MemoryRouter });
    const typeBug = getByText('Bug');

    userEvent.click(typeBug);

    const pokemon = screen.getByText(/caterpie/i);
    expect(pokemon).toBeInTheDocument();
    expect(pokemon.textContent).toBe('Caterpie');

    userEvent.type(typeBug, 'bug');

    const bugButton = screen.getAllByTestId('pokemon-type-button').filter(
      (ele) => ele.textContent === 'Bug',
    );
    expect(bugButton[0].textContent).toBe('Bug');
  });

  it('teste de filtro', () => {
    render(<App />, { wrapper: MemoryRouter });

    const buttonFilter = screen.getByText('All');
    userEvent.click(buttonFilter);
    buttonFilter.click = jest.fn(() => this.filterPokemons('all'));
    expect(buttonFilter.click).toBeTruthy();
  });
});
