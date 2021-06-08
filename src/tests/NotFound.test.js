import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

// Seletores: https://testing-library.com/docs/react-testing-library/cheatsheet
// Exemplos de uso: https://testing-library.com/docs/react-testing-library/example-intro/

describe('4. Teste o componente <NotFound.js />', () => {
  // Sobre o teste abaixo: Fiz similar ao teste do componente About.js
  it('Testa se a TAG H2 possui o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const titulo = getByRole('heading', { level: 2 });
    expect(titulo).toBeInTheDocument();
    expect(titulo).toHaveTextContent('Page requested not found 😭');
  });
  it('Testa se existe uma imagem no componente pelo link da imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    // ALT copiado da imagem através da função "Inspecionar" do Google Chrome
    const alt = getByAltText('Pikachu crying because the page requested was not found');
    expect(alt)
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
