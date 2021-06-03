import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do requisito 4', () => {
  it('A pagina "NotFound" contém uma heade "h2" com texto específico', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const noMatch = getByText('Page requested not found');

    const content = noMatch.textContent;
    const heading2 = noMatch.nodeName;

    expect(heading2).toBe('H2');
    expect(content).toBe('Page requested not found 😭');
  });

  it('A pagina contém a imagem determinada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe');
    const noMatch = getByText('Page requested not found');

    const img = noMatch.nextSibling.nodeName;
    const href = noMatch.nextSibling.src;

    expect(img).toBe('IMG');
    expect(href).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
