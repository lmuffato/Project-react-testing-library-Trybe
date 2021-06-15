import React from 'react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('', () => {
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
});
