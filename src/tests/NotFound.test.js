import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('deve testar um caminho não existente e a renderização do Not Found', () => {
  const { history } = renderWithRouter(<NotFound />);
  history.push('/pagina/que-nao-existe/');
  const h2Text = screen.getByRole('heading', {
    name: /Page requested not found/i,
  });
  expect(h2Text).toBeInTheDocument();
});

// forma de pegar link vista no stackoverflow
// https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
test('Verifica se a imagem é renderizada', () => {
  render(<NotFound />);
  const { getByAltText } = screen;
  const Pokedex = getByAltText('Pikachu crying because the page requested was not found');
  expect(Pokedex).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
