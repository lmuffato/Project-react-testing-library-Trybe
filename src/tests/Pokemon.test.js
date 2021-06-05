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
};

describe('Testa o link "More details" da página inicial.', () => {
  const detailsLinkText = 'More details';

  it('O link deve conter o texto "More details".', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsLink = getByText(detailsLinkText);
    expect(detailsLink.innerHTML).toBe(detailsLinkText);
  });

  it('O link deve ter como href a url "/pokemons/25" a página do Pokemon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsLink = getByText(detailsLinkText);
    expect(detailsLink.href).toContain(pokemonPikachu.url);
  });

  it('Ao clicar no Link a URL deve ser direcionada para "/pokemons/25".', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const detailsLink = getByText(detailsLinkText);
    fireEvent.click(detailsLink);
    history.push(pokemonPikachu.url);
    const pikachuPathname = history.location.pathname;
    expect(pikachuPathname).toBe(pokemonPikachu.url);
  });
});

describe('Testando as alterações de caminho na url para detalhes do pokemon.', () => {
  it('O pokemon Piachu é acessado com a url "/pokemons/25".', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const pikachuPathname = history.location.pathname;
    expect(pikachuPathname).toBe(pokemonPikachu.url);
  });

  it('Na página deve exibir a mensagem "Pikachu Details".', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const pikachuPathname = history.location.pathname;
    expect(pikachuPathname).toBe(pokemonPikachu.url);
    const titlePikachuDetails = getByRole('heading', {
      name: `${pokemonPikachu.name} Details`,
      level: 2,
    });
    expect(titlePikachuDetails).toBeInTheDocument();
  });
});

describe('A página de detalhes deve exibir a imagem e os detalhes do pokemon.', () => {
  it('Deve exibir o nome do pokemon".', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push(pokemonPikachu.url);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe(pokemonPikachu.name);
  });

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
    const pokemonImgAltText = getByAltText('Pikachu sprite');
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
