import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  it('deve renderizar o h2', () => {
    const { getByRole } = renderWithRouter(<App />);

    const h2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });
});
describe('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const btn = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btn).toBeInTheDocument();
  });
  it('deve renderizar o segundo pokemon da lista', () => {
    const { getByRole, getByText } = renderWithRouter(
      <App />,
    );

    const btn = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    fireEvent.click(btn);
    const poke2Name = getByText('Charmander');
    expect(poke2Name).toBeInTheDocument();
  });
  it('deve renderizar o último pokemon da lista', () => {
    const { getByRole, getByText } = renderWithRouter(
      <App />,
    );

    const btn = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);

    const lastPokeName = getByText('Dragonair');
    expect(lastPokeName).toBeInTheDocument();
  });
  it('deve renderizar o primeiro pokemon da lista', () => {
    const { getByRole, getByText } = renderWithRouter(
      <App />,
    );

    const btn = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);
    const firstPokeName = getByText('Pikachu');
    expect(firstPokeName).toBeInTheDocument();
  });
});
describe('Teste se é mostrado apenas um Pokémon por vez', () => {
  it('deve mostrar apenas um pokemon', () => {
    const { getByText } = renderWithRouter(
      <App />,
    );
    const firstPokeName = getByText('Pikachu');
    expect(firstPokeName).toBeInTheDocument();
  });
});
describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('deve circular somente pelos pokémons do tipo', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const typeBtn = getByRole('button', {
      name: /Electric/i,
    });
    expect(typeBtn).toBeInTheDocument();
  });
});
describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('deve ter o texto All no botão', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const allBtn = getByRole('button', {
      name: /All/i,
    });
    expect(allBtn).toBeInTheDocument();
  });
  it('deverá mostrar os Pokémons normalmente (sem filtros)', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const arrayOfPokemons = pokemons;
    console.log(arrayOfPokemons.length);
    const btn = getByRole('button', {
      name: /All/i,
    });
    fireEvent.click(btn);

    const firstPokeName = getByText('Pikachu');
    expect(firstPokeName).toBeInTheDocument();

    const btn2 = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    fireEvent.click(btn2);
    fireEvent.click(btn2);
    fireEvent.click(btn2);

    const firstPokeName2 = getByText('Ekans');
    expect(firstPokeName2).toBeInTheDocument();
  });
});
describe('Teste se é criado um botão de filtro para cada tipo de Pokémon.', () => {
  it('deve renderizar os botões dinamicamente', () => {
    const { getAllByTestId } = renderWithRouter(
      <App />,
    );
    const dinBtns = getAllByTestId('pokemon-type-button');
    expect(dinBtns[0]).toBeInTheDocument();
  });
  it('deve renderizar o botão Fire', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const fireBtn = getByRole('button', {
      name: /Fire/i,
    });
    expect(fireBtn).toBeInTheDocument();
  });
  it('deve renderizar o botão psychic', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const psychicBtn = getByRole('button', {
      name: /Psychic/i,
    });
    expect(psychicBtn).toBeInTheDocument();
  });
  it('deve renderizar o botão electric', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const electricBtn = getByRole('button', {
      name: /Electric/i,
    });
    expect(electricBtn).toBeInTheDocument();
  });
  it('deve renderizar o botão Bug', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const bugBtn = getByRole('button', {
      name: /Bug/i,
    });
    expect(bugBtn).toBeInTheDocument();
  });
  it('deve renderizar o botão poison', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const poisonBtn = getByRole('button', {
      name: /Poison/i,
    });
    expect(poisonBtn).toBeInTheDocument();
  });
  it('deve renderizar o botão dragon', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const dragonBtn = getByRole('button', {
      name: /Dragon/i,
    });
    expect(dragonBtn).toBeInTheDocument();
  });
  it('deve renderizar o botão normal', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const normalBtn = getByRole('button', {
      name: /Normal/i,
    });
    expect(normalBtn).toBeInTheDocument();
  });
});
