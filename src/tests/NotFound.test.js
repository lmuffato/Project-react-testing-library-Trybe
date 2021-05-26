import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Testa se a pagina contem um h2 com o tetst Page requested not found 😭 ', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/desconhecido');

  const notFoundText = getByRole('heading', {
    name: /Page requested not found Crying emoji/i,
    level: 2,
  });

  expect(notFoundText).toBeInTheDocument();
});

it('Testa se o src da imagem e o esperado', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/desconhecido');

  const myImage = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(myImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
