import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const buttonNexPokemonTestId = 'next-pokemon';

describe('Testa os elementos do componente Pokedex', () => {
  it('Teste se a página contém um titulo h2 com o texto "Encountered pokémons".', () => {
    const { getByRole } = renderWithRouter(<App />);
    const titleH2 = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(titleH2).toBeInTheDocument();
  });

  it('Testa se os botões de tipo tem o data-testid="pokemon-type-button"', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonsTestIdFind = getAllByTestId('pokemon-type-button');
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    expect(buttonsTestIdFind.length).toBe(allTypes.length);
  });

  it('Testa o botão para ir para o próximo pokemon.', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonNexPokemon = getByTestId(buttonNexPokemonTestId);
    expect(buttonNexPokemon).toBeInTheDocument();
    expect(buttonNexPokemon.innerHTML).toBe('Próximo pokémon');
  });
});

describe('Testa a funcionalidade do acesso a novos pokemons', () => {
  it('Ao clicar no botão, os próximos pokemons devem ser mostrados'
  + 'sucessivamente.', () => {
    const { getByTestId, getByAltText, getByRole } = renderWithRouter(<App />);

    // Clicando nos botões
    const buttonAll = getByRole('button', { name: /all/i }); // A propriedade name acessa o texto do innerHTML
    fireEvent.click(buttonAll); // Clica no botão All garantir a funcionalidade do botão 'Próximo pokémon'
    const buttonNexPokemon = getByTestId(buttonNexPokemonTestId);
    fireEvent.click(buttonNexPokemon);

    // Testando o próximo pokemon (Charmander)
    const altTextImageChamander = getByAltText('Charmander sprite');
    expect(altTextImageChamander).toBeInTheDocument();
    expect(altTextImageChamander.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
});

describe('Testa a funcionalidade dos botões de filtragem', () => {
  it('Veririca se tem os botões de filtro dos tipos de pokemons'
  + 'o botão "Próximo pokémon" deve ficar desabilitado.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const oneType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    oneType.forEach((type) => {
      const buttonType = getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
    });
  });

  it('Ao clicar nos filtros de "Electric", "Bug", "Poison", "Normal", "Dragon", verifica'
  + 'o botão "Próximo pokémon" deve ficar desabilitado.', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const oneType = ['Electric', 'Bug', 'Poison', 'Normal', 'Dragon'];
    const buttonNexPokemon = getByTestId(buttonNexPokemonTestId);
    oneType.forEach((type) => {
      const buttonType = getByRole('button', { name: type });
      fireEvent.click(buttonType);
      expect(buttonNexPokemon).toBeDisabled();
    });
  });

  it('Testa se tem um botão para resetar os filtros.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
  });
});
