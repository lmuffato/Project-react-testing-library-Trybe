import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import data from '../data';
import App from '../App';

describe('Pokedex teste', () => {
  test('Teste se página contém um heading h2', () => {
    RenderWithRouter(<App />);
    // renderizo sempre com o RenderWithRouter pois estou querendo testar os componetes que estão dentro da app
    const titulo = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(titulo).toBeInTheDocument();
  });

  test('é exibido o próximo Pokémon da lista quando o botão clicado.', () => {
    RenderWithRouter(<App />);
    const btn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(btn);

    const name = screen.getByTestId('pokemon-name'); // pego o elemento do card pokemon (pokemon.js) que tem o testId com o nome do pokemon
    console.log(name.innerHTML); // como o name retorna o html inteiro pego apenas o texto que está dentro
    console.log(data[1].name); // pelo arqivo de dados, pego o pokemon seguindo do array de objetos do data.js

    expect(name.innerHTML).toBe(data[1].name);
  });

  test('testa botão de filtro', () => {
    RenderWithRouter(<App />);
    const btn = screen.getByRole('button', {
      name: /Psychic/i,
    });
    userEvent.click(btn);

    const pokemon = screen.getByText('Alakazam');
    expect(pokemon).toBeInTheDocument();
  });

  // test('testa botão de All', () => {
  //   RenderWithRouter(<Pokedex />);
  //   const btn = screen.getByRole('button', {
  //     name: /All/i,
  //   });
  //   userEvent.click(btn);

  //   const name = screen.getByTestId('pokemon-name');

  //   expect(name.innerHTML).toBeInTheDocument(data[0].name);
  // });

  // test('testa se existe todos btn de filtro', () => {
  //   RenderWithRouter(<App />);
  //   const eletric = screen.getByRole('button', { name: /Eletric/i });
  //   const fire = screen.getByRole('button', { name: /Fire/i });
  //   const bug = screen.getByRole('button', { name: /Bug/i });
  //   const poison = screen.getByRole('button', { name: /Poison/i });
  //   const normal = screen.getByRole('button', { name: /Bug/i });
  //   const dragon = screen.getByRole('button', { name: /ragon/i });

  //   expect(eletric).toBeDefined();
  //   expect(fire).toBeDefined();
  //   expect(bug).toBeDefined();
  //   expect(poison).toBeDefined();
  //   expect(normal).toBeDefined();
  //   expect(dragon).toBeDefined();
  // });

  // test('desabilitar botão', () => {
  //   RenderWithRouter(<App />);

  //   const btn = screen.getByRole('button', {
  //     name: /Próximo pokémon/i,
  //   });

  //   const psychic = screen.getByRole('button', {
  //     name: /Psychic/i,
  //   });

  //   userEvent.click(psychic);

  //   expect(btn).toBeInTheDocument();
  // });
});
