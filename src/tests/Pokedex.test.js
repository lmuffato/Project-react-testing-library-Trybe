import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// Seletores: https://testing-library.com/docs/react-testing-library/cheatsheet
// Exemplos de uso: https://testing-library.com/docs/react-testing-library/example-intro/

describe('5. Teste o componente <Pokedex.js />', () => {
  // Sobre o teste abaixo: Fiz similar ao teste do componente About.js
  it('Testa se a TAG H2 possui o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const titulo = getByRole('heading', { level: 2 });
    expect(titulo).toBeInTheDocument();
    expect(titulo).toHaveTextContent('Encountered pokémons');
  });
  // "data-testid" com valor "next-pokemon" copiado da função "Inspecionar" do Google Chrome
  it('Testa se exibe outro Pokémon quando o botão "Próximo Pokémon" é clicado', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const idBotao = getByTestId('next-pokemon');
    expect(idBotao).toBeInTheDocument();
    expect(idBotao).toHaveTextContent('Próximo pokémon');
  });
  // "data-testid" SEM VALOR ('') copiado da função "Inspecionar" do Google Chrome
  it('Testa se Pokédex contém um botão "ALL" para resetar o filtro', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const botaoAll = getByTestId('');
    userEvent.click(botaoAll);
    expect(botaoAll).toBeInTheDocument();
    expect(botaoAll).toHaveTextContent('All');
  });
  // "data-testid" com valor "pokemon-type-button" copiado da função "Inspecionar" do Google Chrome
  it('Testa se existe um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const categorias = getAllByTestId('pokemon-type-button');
    expect(categorias[0]).toHaveTextContent('Electric');
    expect(categorias[1]).toHaveTextContent('Fire');
    expect(categorias[2]).toHaveTextContent('Bug');
    expect(categorias[3]).toHaveTextContent('Poison');
    expect(categorias[4]).toHaveTextContent('Psychic');
    expect(categorias[5]).toHaveTextContent('Normal');
    expect(categorias[6]).toHaveTextContent('Dragon');
  });
});
