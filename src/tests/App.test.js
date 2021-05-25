import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes para o componente "App.js"', () => {
  test('Renderiza um heading com o texto "Pokédex"', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('A página principal da Pokédex é renderizada ao carregar a'
  + ' aplicação no caminho de URL "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
