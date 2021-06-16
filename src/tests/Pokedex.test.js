import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pokemonTypes = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

describe('Testa o component Pokedex', () => {
  it('Testa se renderiza um h2 com texto: Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const text = getByText(/Encountered pokémons/i);
    expect(text).toBeInTheDocument();
  });
  it('Testa se a pokédex tem um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const resetBtn = getByRole('button', { name: 'All' });

    fireEvent.click(resetBtn);

    expect(resetBtn).toBeInTheDocument();
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  it('Testa se a pokedéx tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    for (let i = 0; i < pokemonTypes.length; i += 1) {
      expect(filterButtons[i]).toHaveTextContent(pokemonTypes[i]);
    }
  });
  it('Testa se o botão Próximo está desabilitado com a lista contendo 1 Pokemon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const buttonNext = getByTestId(/next-pokemon/i);
    const filterButton = getByRole('button', { name: 'Electric' });

    fireEvent.click(filterButton);
    expect(buttonNext).toHaveTextContent(/Próximo pokémon/i);
    expect(buttonNext).toBeDisabled();
  });
});

// Referências:
// Consulta ao repositório: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/114/commits/de788fed8bbb767ba18a6cb19beb76e5ee594b28
// Consulta ao repositório: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/105/commits/f1989282615a065e015a4bd825cf14b3d4f48a87
// Consulta ao repositório: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/53/commits/e595400f4c27ca7f4129c7e0684924486e84fb6a
// https://blog.rocketseat.com.br/introducao-a-testing-library-testando-componentes-react/
