import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, getAllByText, getByAltText } = renderWithRouter(<App />);

    /* O nome correto do Pokémon deve ser mostrado na tela; */
    expect(getByText('Pikachu')).toBeInTheDocument();

    /* O tipo correto do pokémon deve ser mostrado na tela. */
    expect(getAllByText('Electric').length).toBe(2);

    /* O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida. */
    expect(getByText('Average weight: 6.0 kg'));

    const pokeImg = getByAltText('Pikachu sprite');

    /* A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon; */
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const details = getByRole('link', {
      name: /more details/i,
    });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
