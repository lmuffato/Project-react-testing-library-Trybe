import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  const screen = renderWithRouter(<App />);
  const namePoke = screen.getByTestId('pokemon-name');
  const typePoke = screen.getByTestId('pokemon-type');
  const weighPoke = screen.getByTestId('pokemon-weight');
  const detailsLink = screen.getByRole('link', { name: /More details/i });
  const {
    name,
    type,
    image,
    id,
    averageWeight: { value, measurementUnit },
  } = pokemons[0];
  const imagePoke = screen.getByAltText(/sprite/i);
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    expect(namePoke.innerHTML).toBe(name);
  });
  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    expect(typePoke.innerHTML).toBe(type);
  });
  it(`O peso médio do pokémon deve ser exibido com um texto no formato
  Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> 
  são, respectivamente, o peso médio do pokémon e sua unidade de medida`, () => {
    expect(weighPoke.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
  });
  it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL
  da imagem e um atributo alt com o texto <name> sprite, 
  onde <name> é o nome do pokémon;`, () => {
    expect(imagePoke.src).toBe(image);
    expect(imagePoke.alt).toBe(`${name} sprite`);
  });
  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, 
  onde <id> é o id do Pokémon exibido;`, () => {
    expect(detailsLink.href).toBe(`http://localhost/pokemons/${id}`);
  });
  userEvent.click(detailsLink);
  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento 
  da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history: { location: { pathname } } } = screen;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  userEvent.click(screen.getByRole('checkbox'));
  const starOfFavorited = screen.getByAltText(`${name} is marked as favorite`);
  it(`Teste se existe um ícone de estrela nos Pokémons favoritados. O ícone deve ser uma
   imagem com o atributo src contendo o caminho /star-icon.svg; A imagem deve ter o 
   atributo alt igual a <pokemon> is marked as favorite, 
   onde <pokemon> é o nome do Pokémon exibido.`, () => {
    expect(starOfFavorited.src).toBe('http://localhost/star-icon.svg');
  });
});
