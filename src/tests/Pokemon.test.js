import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import { Pokemon } from '../components';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pikachu = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with'
  + 'electricity to make them tender enough to eat.',
};

describe('Teste sobre o componente Pokémon.', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);
    const nome = getByText(/pikachu/i);
    expect(nome).toBeInTheDocument();
  });

  it('O tipo correto do pokémon deve ser exibido.', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const tipo = getAllByText(/Electric/i);
    expect(tipo.length).toBe(2);
  });

  it('O peso médio deve ser exibido.', () => {
    const { getByText } = renderWithRouter(<App />);
    const peso = getByText(/Average weight: 6.0 kg/i);
    expect(peso).toBeInTheDocument();
  });

  // it('A imagem do Pokémon de ser exibida.', () => {
  //   const { getByAltText } = renderWithRouter(<App />);
  //   const imagem = getByAltText(`${pikachu.name} sprite`);
  //   expect(imagem).toBeInTheDocument();
  //   expect(imagem).toHaveAttribute('src', `${pikachu.image}`);
  // });

  // it('Testa o link detalhes do Card.', () => {
  //   const { history, getByRole } = renderWithRouter(<App />);
  //   const link = getByRole('link', { name: /more details/i });
  //   expect(link).toBeInTheDocument();
  //   userEvent.click(link);

  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/pokemons/25');
  // });

  // it('Teste icone de estrela de favorito.', () => {
  //   renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
  //   const image = screen.getByRole('img', {
  //     name: /pikachu is marked as favorite/i });
  //   expect(image).toHaveAttribute('src', '/star-icon.svg');
  //   expect(image).toHaveAttribute('alt', `${pikachu.name} is marked as favorite`);
  // });
});
