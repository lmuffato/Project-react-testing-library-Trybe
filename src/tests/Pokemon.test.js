import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';

describe('Nome do teste', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = RenderWithRouter(<App />);

    const nome = getByTestId('pokemon-name');
    expect(nome).toHaveTextContent('Pikachu');

    const tipo = getByTestId('pokemon-type');
    expect(tipo).toHaveTextContent('Electric');

    const peso = getByTestId('pokemon-weight');
    expect(peso).toHaveTextContent('Average weight: 6.0 kg');

    const imagem = getByAltText('Pikachu sprite');
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagem).toBeInTheDocument();
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { history, getByText } = RenderWithRouter(<App />);
    const getBtn = getByText('More details');
    userEvent.click(getBtn);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redir', () => {
    const { getByRole, history } = RenderWithRouter(<App />);
    const buttonDetails = getByRole('link', { name: /more details/i });
    userEvent.click(buttonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText, getByRole, history } = RenderWithRouter(<App />);
    history.push('/pokemons/25');
    const butaunzin = getByRole('checkbox');
    userEvent.click(butaunzin);
    const estrelaTexto = getByAltText(/Pikachu is marked as favorite/i);
    const estrelinha = '/star-icon.svg';
    expect(estrelaTexto.src).toMatch(estrelinha);
  });
});
