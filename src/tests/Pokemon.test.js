import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  describe(`Teste se é renderizado um card com as informações de determinado
 pokémon.`, () => {
    it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonName = screen.getByTestId(/pokemon-name/i);
      expect(pokemonName.textContent).toBe('Pikachu');
    });

    it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonType = screen.getByTestId(/pokemon-type/i);
      expect(pokemonType.textContent).toBe('Electric');
    });
    it(`O peso médio do pokémon deve ser exibido com um texto no 
formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, 
respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonWeight = screen.getByTestId(/pokemon-weight/i);
      expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    });
    it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo 
src com a URL da imagem e um atributo alt com o texto <name> sprite, 
onde <name> é o nome do pokémon;`, () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonImg = screen.getByAltText(/pikachu sprite/i);
      expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para 
exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o 
id do Pokémon exibido;`, () => {});
  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento 
da aplicação para a página de detalhes de Pokémon.`, () => {});
  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é 
o id do Pokémon cujos detalhes se deseja ver;`, () => {});

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    it(`O ícone deve ser uma imagem com o atributo src contendo o 
caminho /star-icon.svg`, () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      userEvent.click(screen.getByLabelText(/pokémon favoritado\?/i));
      const pokemonStarMarked = screen.getByAltText(/Pikachu is marked as favorite/i);
      expect(pokemonStarMarked.src).toBe('http://localhost/star-icon.svg');
    });
    it(`A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, 
onde <pokemon> é o nome do Pokémon exibido.`, () => {});
  });
});
