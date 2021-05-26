import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';
/* it('', () => {}); */

describe('Teste do componente Pokedex', () => {
  it('este se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByText, queryByTestId, queryAllByTestId } = renderWithRouter(<App />);
    const btn = getByText('Próximo pokémon');
    expect(btn).toBeInTheDocument();
    pokemons.forEach(({ name }) => {
      expect(queryAllByTestId('pokemon-name').length).toBe(1);
      expect(getByText(name)).toBeInTheDocument();
      userEvent.click(btn);
    });
    expect(queryByTestId('pokemon-name').textContent).toBe('Pikachu');
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole, queryByTestId } = renderWithRouter(<App />);
    pokemons.forEach(({ type }) => {
      const buttonFilter = getByRole('button', { name: type });
      expect(buttonFilter).toBeInTheDocument();
      userEvent.click(buttonFilter);
      expect(queryByTestId('pokemon-type').textContent).toBe(type);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('é criado dinamicamente um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole, getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const multipleItem = [];
    const buttonsNames = [];

    pokemons.forEach((item, index1) => {
      pokemons.forEach(({ type }, index2) => {
        if (item.type === type && index1 !== index2) {
          multipleItem.push(item.type);
          const btnFilter = getByRole('button', { name: type });
          userEvent.click(btnFilter);
          expect(getByTestId('next-pokemon')).not.toBeDisabled();
        }
      });
    });
    const buttons = getAllByTestId('pokemon-type-button');
    buttons.forEach((button) => buttonsNames.push(button.textContent));
    const menosUm = -1;

    const filtred = buttonsNames
      .filter((objeto) => multipleItem.indexOf(objeto) === menosUm);
    filtred.forEach((itemName) => {
      const btnFilter = getByRole('button', { name: itemName });
      userEvent.click(btnFilter);
      expect(getByTestId('next-pokemon')).toBeDisabled();
    });
  });
});
