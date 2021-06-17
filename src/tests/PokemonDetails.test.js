import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  describe(`Teste se as informações detalhadas do 
  Pokémon selecionado são mostradas na tela.`, () => {
    it(`A página deve conter um texto <name> Details, 
    onde <name> é o nome do Pokémon;`, () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonDetailsTitle = screen.getByText(/pikachu details/i);
      expect(pokemonDetailsTitle.textContent).toBe('Pikachu Details');
    });

    it(`Não deve existir o link de navegação para os detalhes do Pokémon
    selecionado.`, () => {});

    it('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonDetailsTitle = screen.getByRole('heading', {
        level: 2,
        name: 'Summary',
      });
      expect(pokemonDetailsTitle.textContent).toBe('Summary');
    });

    it(`A seção de detalhes deve conter um parágrafo com o resumo do Pokémon 
    específico sendo visualizado.`, () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonResume = screen.getByText(/This intelligent Pokémon roasts hard/i);
      expect(pokemonResume.textContent).toBeDefined();
    });
  });

  describe(`Teste se existe na página uma seção com os mapas contendo 
  as localizações do pokémon`, () => {
    it(`Na seção de detalhes deverá existir um heading h2 com o texto 
    Game Locations of <name>; onde <name> é o nome do Pokémon exibido.`, () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonLocalizationTitle = screen.getByRole('heading', {
        level: 2,
        name: 'Game Locations of Pikachu',
      });
      expect(pokemonLocalizationTitle.textContent).toBe('Game Locations of Pikachu');
    });

    it(`Todas as localizações do Pokémon devem ser mostradas na seção 
    de detalhes;`, () => {});

    it(`Devem ser exibidos, o nome da localização e uma imagem do mapa em 
    cada localização;`, () => {});

    it(`A imagem da localização deve ter um atributo src com a URL da 
    localização;`, () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonAltImg = screen.getAllByAltText(/pikachu location/i);

      expect(pokemonAltImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(pokemonAltImg[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    });

    it(`A imagem da localização deve ter um atributo alt com o texto <name> 
    location, onde <name> é o nome do Pokémon;`, () => {});
  });

  describe(`Teste se o usuário pode favoritar um pokémon 
  através da página de detalhes.`, () => {
    it('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {});

    it(`Cliques alternados no checkbox devem adicionar e remover respectivamente 
    o Pokémon da lista de favoritos;`, () => {

    });
    it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
      render(<App />, { wrapper: MemoryRouter });

      userEvent.click(screen.getByText(/more details/i));
      const pokemonLabel = screen.getByLabelText(/pokémon favoritado\?/i);
      expect(pokemonLabel).toBeDefined();
    });
  });
});
