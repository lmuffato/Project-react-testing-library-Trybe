import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const lastPokemon = 7;
const nextPokemonTitle = 'Próximo pokémon';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        { component }
      </Router>,
    ),
    history,
  });
};

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByText } = renderWithRouter(<App />);
    const headingText = getByText('Encountered pokémons');
    expect(headingText).toBeInTheDocument();
  });

  it('Próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
  // O botão deve conter o texto Próximo pokémon;
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextButton = getByRole('button', { name: nextPokemonTitle });
    expect(nextButton).toBeInTheDocument();

    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    userEvent.click(nextButton);
    const charmanderPokemon = getByText('Charmander');
    expect(charmanderPokemon).toBeInTheDocument();
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    for (let index = 0; index < lastPokemon; index += 1) {
      userEvent.click(nextButton);
    }
    userEvent.click(nextButton);
    const firstPokemon = getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const { getByRole, getByText } = renderWithRouter(<App />);
    const psyButton = getByRole('button', { name: 'Psychic' });
    userEvent.click(psyButton);
    const nextButton = getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextButton);
    const nextPsyPokemon = getByText('Mew');
    expect(nextPsyPokemon).toBeInTheDocument();
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // O texto do botão deve ser All;
    const { getByRole, getByAltText } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    const nextButton = getByRole('button', { name: nextPokemonTitle });
    expect(buttonAll).toBeInTheDocument();

    // Ao carregar a página, o filtro selecionado deverá ser All;
    const getPikachu = getByAltText('Pikachu sprite');
    expect(getPikachu).toBeInTheDocument();

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    userEvent.click(buttonAll);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    const getBugSpecie = getByAltText('Caterpie sprite');
    expect(getBugSpecie).toBeInTheDocument();
  });

  it('Filtros dinamicos:', () => {
    // const { getByRole, getByAltText } = renderWithRouter(<App />);
    // Os botões de filtragem devem ser dinâmicos;

    // Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric, Bug, Poison, Dragon e Normal;

    // Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível.
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(lastPokemon);
  });

  it('Desabilita botao Proximo Pokemon.', () => {
    // O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.'
    const { getByRole } = renderWithRouter(<App />);
    const electricButton = getByRole('button', { name: 'Electric' });
    const nextButton = getByRole('button', { name: nextPokemonTitle });
    userEvent.click(electricButton);
    expect(nextButton).toBeDisabled();
  });
});
