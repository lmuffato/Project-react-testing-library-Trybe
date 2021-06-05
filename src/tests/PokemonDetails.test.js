import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonPikachu = {
  url: '/pokemons/25',
  name: 'Pikachu',
  type: 'Electric',
  wigth: 'Average weight: 6.0 kg',
  imgPath: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  imgAltText: 'Pikachu sprite',
  summaryText: 'This intelligent Pokémon roasts hard berries'
  + ' with electricity to make them tender enough to eat.',
  locations: [
    {
      name: 'Kanto Viridian Forest',
      img: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    }, {
      name: 'Kanto Power Plant',
      img: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};

describe('Testando a página de detalhes do pokemon.', () => {
  it('Na página deve exibir a mensagem "Pikachu Details".', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const titlePikachuDetails = getByRole('heading', {
      name: `${pokemonPikachu.name} Details`,
      level: 2,
    });
    expect(titlePikachuDetails).toBeInTheDocument();
  });
});

it('Na página deve exibir um sumário em h2.', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  history.push(pokemonPikachu.url);
  const titleSumary = getByRole('heading', {
    name: /Summary/,
    level: 2,
  });
  expect(titleSumary).toBeInTheDocument();
});

it('Na página deve exibir um paráfro sobre o pokemon.', () => {
  const { history, getByText } = renderWithRouter(<App />);
  history.push(pokemonPikachu.url);
  const textSummary = getByText(pokemonPikachu.summaryText);
  expect(textSummary).toBeInTheDocument();
});

describe('Teste a seção com os mapas contendo as localizações do pokémon.', () => {
  it('Na página deve exibir o texto "Game Locations of <NomeDoPokemon>" em h2.', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const titleSumary = getByRole('heading', {
      name: `Game Locations of ${pokemonPikachu.name}`,
      level: 2,
    });
    expect(titleSumary).toBeInTheDocument();
  });

  it('Deve conter o nome dos locais onde o pokemon é econtrado".', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    pokemonPikachu.locations.forEach((name, index) => {
      const pokemonLocalName = getByText(pokemonPikachu.locations[index].name);
      expect(pokemonLocalName).toBeInTheDocument();
    });
  });

  it('Deve conter as imagens dos mapas.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    pokemonPikachu.locations.forEach((img, index) => {
      const pokemonLocalImg = getByText(pokemonPikachu.locations[index].name);
      expect(pokemonLocalImg).toBeInTheDocument();
    });
  });

  it('As imagens dos mapas devem ter um texto alternativo "<Polkemon> Location".', () => {
    const { history, getAllByAltText } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const altTextImg = getAllByAltText(`${pokemonPikachu.name} location`);
    expect(altTextImg.length).toBe(pokemonPikachu.locations.length);
    altTextImg.forEach((imgAlt, index) => {
      expect(imgAlt.src).toBe(pokemonPikachu.locations[index].img);
    });
  });
});

describe('Testa a exibição da imagem e detalhes do pokémon.', () => {
  it('Deve exibir o tipo do pokemon".', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe(pokemonPikachu.type);
  });

  it('Deve exibir o peso médio do pokemon".', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.innerHTML).toBe(pokemonPikachu.wigth);
  });

  it('Deve exibir a imagem do pokemon".', () => {
    const { history, getByAltText } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const pokemonImgAltText = getByAltText(`${pokemonPikachu.name} sprite`);
    expect(pokemonImgAltText.src.includes('.png')).toBe(true); // A imagem deve ser do tipo ".png"
    expect(pokemonImgAltText.src).toBe(pokemonPikachu.imgPath);
  });
});

describe('Testa o pokemon marcado como favorito', () => {
  it('O pokemon Piachu é favoritado ao clicar no chechBox "Pokémon favoritado?"', () => {
    const { history, getByLabelText, getByAltText } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const checkBoxForFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkBoxForFavorite);
    const imgStarFavorite = getByAltText(`${pokemonPikachu.name} is marked as favorite`);
    expect(imgStarFavorite).toBeInTheDocument();
    fireEvent.click(checkBoxForFavorite);
    expect(imgStarFavorite).not.toBeInTheDocument();
  });

  it('A imagem de uma estrela aparece se o Pokémon for marcado como favorito'
  + ' e deve desaparecer se ele for desmarcado como favorito', () => {
    const { history, getByLabelText, getByAltText } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const checkBoxForFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkBoxForFavorite);
    const imgStarFavorite = getByAltText(`${pokemonPikachu.name} is marked as favorite`);
    expect(imgStarFavorite.src).toContain('/star-icon.svg');
    expect(imgStarFavorite).toBeInTheDocument();
    fireEvent.click(checkBoxForFavorite);
    expect(imgStarFavorite).not.toBeInTheDocument();
  });
});
