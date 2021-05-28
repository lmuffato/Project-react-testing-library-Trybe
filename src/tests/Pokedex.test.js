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

    const name = screen.getByTestId('pokemon-name');
    // pego o elemento do card pokemon (pokemon.js) que tem o testId com o nome do pokemon
    console.log(name.innerHTML);
    // como o name retorna o html inteiro pego apenas o texto que está dentro
    console.log(data[1].name);
    // pelo arqivo de dados, pego o pokemon seguindo do array de objetos do data.js

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

  test('testa botão de All', () => {
    RenderWithRouter(<App />);
    const btn = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(btn);

    const name = screen.getByTestId('pokemon-name');

    expect(name.innerHTML).toBe(data[0].name);
  });

  test('testa se existe todos btn de filtro', () => {
    RenderWithRouter(<App />);
    const eletric = screen.getByRole('button', { name: /Electric/i });
    expect(eletric).toBeInTheDocument();

    const fire = screen.getByRole('button', { name: /Fire/i });
    expect(fire).toBeInTheDocument();

    const bug = screen.getByRole('button', { name: /Bug/i });
    expect(bug).toBeInTheDocument();

    const poison = screen.getByRole('button', { name: /Poison/i });
    expect(poison).toBeInTheDocument();

    const normal = screen.getByRole('button', { name: /Bug/i });
    expect(normal).toBeInTheDocument();

    const dragon = screen.getByRole('button', { name: /ragon/i });
    expect(dragon).toBeInTheDocument();
  });

  test('desabilitar botão quando lista filtrada de Pokémons tiver um só pokémon', () => {
    RenderWithRouter(<App />);

    const btn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    const btnFiltros = screen.getAllByTestId('pokemon-type-button');
    // pego todos os botões de filtro, o botão do index 2 é um dos botões de filtros que tem apenas 1 pokemon,
    // então testo se quando clicaco, desabilita o next pokemon

    userEvent.click(btnFiltros[2]);

    expect(btn).toBeDisabled();
  });
});
