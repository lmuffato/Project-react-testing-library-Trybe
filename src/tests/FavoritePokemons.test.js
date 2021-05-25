import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/helper';

describe('Testa a tela de favoritos', () => {
  afterEach(() => jest.clearAllMocks());
  it('Testa se exibe a mensagem caso não haja pokemons salvos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const msg = 'No favorite pokemon found';
    const notFound = getByText(msg);

    expect(notFound).toBeInTheDocument();
  });
  it('Testa se exibe os pokemons adicionados', async () => {
    const pokemon = {};

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(pokemon),
    });

    const { findByText, history, findAllByTestId } = renderWithRouter(<App />);
    userEvent.click(await findByText('More details'));
    userEvent.click(await findByText('Pokémon favoritado?'));
    history.push('/favorites');
    const name = findAllByTestId('pokemon-name');

    expect(name).toEqual('Pikachu');
  });
});
