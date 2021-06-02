import React from 'react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2Test = getByRole('heading', {
      level: 2,
    });

    expect(h2Test).toHaveTextContent('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    /* O botão deve conter o texto Próximo pokémon; */
    const nextPoke = getByRole('button', {
      name: /próximo pokémon/i,
    });
    fireEvent.click(nextPoke);

    /* Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão; */
    expect(getByText('Charmander')).toBeInTheDocument();
    for (let index = 0; index < (pokemons.length - 1); index += 1) {
      fireEvent.click(nextPoke);
    }

    /* O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista; */
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
