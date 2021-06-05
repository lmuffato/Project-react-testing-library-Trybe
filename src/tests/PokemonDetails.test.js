import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  const screen = renderWithRouter(<App />);
  const detailsLink = screen.getByRole('link', { name: /More details/i });
  const {
    name,
    summary,
    foundAt,
  } = pokemons[0];
  userEvent.click(detailsLink);
  const titleDetails = screen.getByRole('heading', { name: /details/i, level: 2 });
  it('A página deve conter um texto <name> Details, onde <name> '
  + 'é o nome do Pokémon;', () => {
    expect(titleDetails.innerHTML).toBe('Pikachu Details');
  });
  it(' Não deve existir o link de navegação para os detalhes'
  + ' do Pokémon selecionado.', () => {
    expect(detailsLink).not.toBeInTheDocument();
  });
  const summaryTitle = screen.queryByRole('heading', { name: /Summary/i, level: 2 });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    expect(summaryTitle.innerHTML).toBe('Summary');
  });
  const summaryParagraph = screen.queryByText(summary);
  it('A seção de detalhes deve conter um parágrafo com o resumo'
  + ' do Pokémon específico sendo visualizado.', () => {
    expect(summaryParagraph.innerHTML).toBe(summary);
  });
  const headingGameLocation = screen
    .getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
  it(`Na seção de detalhes deverá existir um heading h2 com o texto 
  Game Locations of <name>; onde <name> é o nome do Pokémon exibido.`, () => {
    expect(headingGameLocation.innerHTML).toBe('Game Locations of Pikachu');
  });
  const imageLocations = screen.getAllByAltText(`${name} location`);
  const decribeLocations = [];
  for (let index = 0; index < foundAt.length; index += 1) {
    decribeLocations.push(screen.getByText(foundAt[index].location));
  }
  it('Devem ser exibidos, o nome e uma imagem do mapa em cada localização;', () => {
    expect(imageLocations.length).toBe(foundAt.length);
    for (let index = 0; index < imageLocations.length; index += 1) {
      expect(imageLocations[index].src).toBe(foundAt[index].map);
      expect(decribeLocations[index].innerHTML).toBe(foundAt[index].location);
    }
  });
  it(`A página deve exibir um checkbox que permite favoritar o Pokémon;
  Cliques alternados devem adicionar e remover o Pokémon da lista de favoritos;
  O label do checkbox deve conter o texto Pokémon favoritado?;`, () => {
    const screen2 = renderWithRouter(<App />);
    userEvent.click(screen2.getByRole('link', { name: /More details/i }));
    userEvent.click(screen2.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
    const starOfFavorite = screen2.getByAltText(`${name} is marked as favorite`);
    expect(starOfFavorite).toBeInTheDocument();
    userEvent.click(screen2.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
    expect(starOfFavorite).not.toBeInTheDocument();
  });
});
