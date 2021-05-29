import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "NotFound"', () => {
  it(`Teste se página contém um heading h2 com 
    o texto Page requested not found 😭`, () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe');

    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(notFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    const textAlt = 'Pikachu crying because the page requested was not found';

    history.push('/not-found');

    const imageAlt = getByAltText(textAlt);

    expect(imageAlt).toBeInTheDocument();
  });
});
