import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa todo o Componente "NotFound"', () => {
  test('Teste se página contém um heading h2 com o texto'
  + 'Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);

    history.push('NaoExisteEstaUrl');

    const h2 = screen.getByText(/Page requested not found/i);
    const imgSpan = screen.getAllByRole('img')[0];
    const imgSpanValue = imgSpan.getAttribute('aria-label');

    expect(h2).toBeInTheDocument();
    expect(imgSpanValue).toBe('Crying emoji');
  });

  test('Verifica se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);

    history.push('NaoExisteEstaUrl');

    const imgPage = screen.getAllByRole('img')[1];
    const imgPageSrc = imgPage.getAttribute('src');
    expect(imgPage).toBeInTheDocument();
    expect(imgPageSrc).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
