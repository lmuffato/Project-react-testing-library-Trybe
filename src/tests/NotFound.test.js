import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa os elementos do componente NotFound.', () => {
  it('Uma url inválida deve redirecionar para a página Not Found.', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/pagina/que-nao-existe/');
    const notExistPathname = history.location.pathname;
    expect(notExistPathname).toBe('/pagina/que-nao-existe/');
  });

  it('Na página Not Found deve exibir a mensagem "Page requested not found".', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const pageNotFoundMsg = getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(pageNotFoundMsg).toBeInTheDocument();
  });

  it('Na página Not Found deve mostra a imagem do pokemon frustado.', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const notFoundImg = getAllByRole('img');
    expect(notFoundImg[1]).toBeInTheDocument();
    console.log(notFoundImg[1]);
    expect(notFoundImg[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  it('A imagem do pokemon frustado deve ter um texto alternativo.', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const notFoundImg = getAllByRole('img');
    expect(notFoundImg[1]).toBeInTheDocument();
    console.log(notFoundImg[1]);
    const altTextImg = 'Pikachu crying because the page requested was not found';
    expect(notFoundImg[1].alt).toBe(altTextImg);
  });
});
