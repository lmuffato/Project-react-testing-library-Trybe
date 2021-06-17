import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requisito 4 Teste o componente `<NotFound.js />', () => {
  it('Teste se página contém um `h2` com o texto `Page requested not found', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/*');
    const h2Text = getByRole('heading', { level: 2, name: /Page requested not found/i });

    expect(h2Text).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const { history, getByAltText } = renderWithRouter(<App />);
    history.push('/*');
    const img = getByAltText('Pikachu crying because the page requested was not found');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img.src).toBe(src);
  });
});
