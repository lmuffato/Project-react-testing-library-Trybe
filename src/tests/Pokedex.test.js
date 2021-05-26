import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Pokedex from '../components/Pokedex';

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

// const pokemonMock = [
//   {
//     id: 25,
//     name: 'PikaMock',
//     type: 'Electric',
//     averageWeight: {
//       value: '6.0',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Kanto Viridian Forest',
//         map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//       },
//       {
//         location: 'Kanto Power Plant',
//         map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//       },
//     ],
//     summary: 'This intellig electricity to make them tender enough to eat.',
//   },
//   {
//     id: 4,
//     name: 'CharMock',
//     type: 'Fire',
//     averageWeight: {
//       value: '8.5',
//       measurementUnit: 'kg',
//     },
//     image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
//     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
//     foundAt: [
//       {
//         location: 'Alola Route 3',
//         map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
//       },
//       {
//         location: 'Kanto Route 3',
//         map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
//       },
//       {
//         location: 'Kanto Route 4',
//         map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
//       },
//       {
//         location: 'Kanto Rock Tunnel',
//         map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
//       },
//     ],
//     summary: 'The flame on its force. If it is weak, the flame also burns weakly.',
//   },
// ];

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
    // const { getAllByRole } = renderWithRouter(<App />);
    // const button = getAllByRole('button');

    // Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric, Bug, Poison, Dragon e Normal;

    // Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível.
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
