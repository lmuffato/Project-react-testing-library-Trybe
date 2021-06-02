import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import Pokemon from '../components/Pokemon';

// const pokeType = 'pokemon-type';
const pokeName = 'pokemon-name';
const moreDetails = 'More details';

function gettingDragonairDetails() {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/148');
}
function gettingDragonairDetails2() {
  renderWithRouter(<App />);
  const dragonButton = screen.getByRole('button', { name: /dragon/i });
  userEvent.click(dragonButton);
  const linkDetails = screen.getByRole('link', {
    name: moreDetails,
  });
  userEvent.click(linkDetails);
}

describe('Testes das informações detalhadas do Pokémon selecionado na tela.', () => {
  test('conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    gettingDragonairDetails2();
    const pokemonName = screen.getAllByTestId(pokeName);
    const pokemonDetails = screen.getByRole('heading', {
      name: `${pokemonName[0].innerHTML} Details`,
      level: 2,
    });
    expect(pokemonDetails).toBeInTheDocument();
  });
  test('testa o dragonair details', () => {
    gettingDragonairDetails();
    const dragonairDetails = screen.getByRole('heading', { name: 'Dragonair Details' });
    expect(dragonairDetails).toBeInTheDocument();
  });
  test('testa que não há link para mais detalhes em <PokemonDetails>', () => {
  // Falta o teste do link nao estar na pagina
  });
  test('seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    gettingDragonairDetails2();
    const summary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summary).toBeInTheDocument();
  });
  test('seção detalhes deve conter um <p> com o resumo do Pokémon específico', () => {
    gettingDragonairDetails();
    const dragonairSummary = /They say that if it emits an aura from its whole body/;
    const dragSum = screen.getByText(dragonairSummary);
    expect(dragSum).toBeInTheDocument();
  });
});
describe('existe <PokemonDetails> uma seção com os mapas da loc. do pokémo', () => {
  test('testa <h2> com Game Location s{pokemonName}', () => {
    gettingDragonairDetails2();
    const gameLocation = screen.getByRole('heading', {
      name: /Game Locations/,
      level: 2,
    });
    expect(gameLocation).toBeInTheDocument();

    const pokemonName = screen.getAllByTestId(pokeName);
    const gameLocation2 = screen.getByRole('heading', {
      name: `Game Locations of ${pokemonName[0].innerHTML}`,
      level: 2,
    });
    expect(gameLocation2).toBeInTheDocument();
  });
  test('as localizações do pokemon, e nomes destas, devem ser mostradas', () => {
    gettingDragonairDetails();
    // testa se há imagens de localização
    const totalImgLocDragonair = 2;
    const pokemonName = screen.getAllByTestId(pokeName);
    const locations = screen.getAllByAltText(`${pokemonName[0].innerHTML} location`);
    expect(locations[0]).toBeInTheDocument();
    expect(locations.length).toBe(totalImgLocDragonair);
    // testando nome das rotas
    const johtoRoute45 = screen.getByText(/Route 45/);
    const johtonDragonsDen = screen.getByText(/Johto Dragon/);
    expect(johtoRoute45).toBeInTheDocument();
    expect(johtonDragonsDen).toBeInTheDocument();
  });
  test('A img-loc ter atributo src com URL da localização, alt pokename location', () => {
    gettingDragonairDetails();
    const pokemonName = screen.getAllByTestId(pokeName);
    const locations = screen.getAllByRole('img', {
      name: `${pokemonName[0].innerHTML} location`,
    });
    expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png');
  });
});
