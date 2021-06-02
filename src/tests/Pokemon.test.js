import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  test('Se o nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      expect(getAllByText(pokemon.type).length).toBe(2);
      userEvent.click(nextButton);
    });
  });
  test('Se o peso médio do pokémon é exibido com um texto no formato correto', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      const { averageWeight: { measurementUnit, value } } = pokemon;
      expect(getByText(
        `Average weight: ${value} ${measurementUnit}`,
      )).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
  test('Se a imagem do Pokémon deve ser exibida e se tem o atributos src e alt.', () => {
    const { getByRole, getByAltText, getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      const selectImg = getByRole('img');
      expect(selectImg.src).toBe(pokemon.image);
      expect(getByAltText(`${pokemon.name} sprite`)).toBeTruthy();
      expect(selectImg.alt).toBe(`${pokemon.name} sprite`);
      userEvent.click(nextButton);
    });
  });
  test('se o card do Pokémon contém um link de navegação "more detail".', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More details/i);
    expect(buttonDetails.href).toBe('http://localhost/pokemons/25');
  });
  test('Se ao clicar no link de navegação, redireciona paradetalhes de Pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonDetails = getByText(/More details/i);
    userEvent.click(buttonDetails);
    const namePokemon = getByText(/Pikachu Details/i);
    expect(namePokemon).toBeInTheDocument();
  });
  test('Se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText('More details');
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('se a uma imagem com o atributo `src` contem o caminho `/star-icon.svg`', () => {
    const { getByRole, getByAltText, getByLabelText } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
    const linkDetails = getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const buttonFavorite = getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(buttonFavorite);
    const pokemon = getByAltText(/Pikachu is marked as favorite/i);
    expect(pokemon.src).toBe('http://localhost/star-icon.svg');
    /** Consultei o repositório do Carlos campos para resolver essa parte.
https://github.com/tryber/sd-010-a-project-react-testing-library/pull/113
*/
  });
});
