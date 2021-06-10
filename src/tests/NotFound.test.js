import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('verifica implementação do componente Not Found', () => {
  const {
    getByRole,
    history,
  } = renderWithRouter(<NotFound />);
  history.push('/pagina/nao-encontrada');
  const notFound = getByRole('heading', {
    level: 2,
    // Nessa parte fiz como foi sugerido no próprio erro do test.
    name: 'Page requested not found Crying emoji',
  });
  expect(notFound).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const { getAllByRole, history } = renderWithRouter(<NotFound />);
  history.push('/pagina/nao-encontrada');
  const getImg = getAllByRole('img');
  expect(getImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
