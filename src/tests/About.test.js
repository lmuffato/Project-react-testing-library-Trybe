import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

// Seletores: https://testing-library.com/docs/react-testing-library/cheatsheet
// Exemplos de uso: https://testing-library.com/docs/react-testing-library/example-intro/

describe('2. Teste o componente <About.js />', () => {
  it('Testa se a página exibe informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const titulo = getByText(/This application simulates a Pokédex/i);
    expect(titulo).toBeInTheDocument();
  });
  // Sobre o teste abaixo: https://testing-library.com/docs/queries/byrole
  // Este link explica porque usar getByRole('heading', { level: 3 })
  // ao invés de simplesmente usar getByRole(h3)
  it('Testa se a TAG H2 possui o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const titulo = getByRole('heading', { level: 2 });
    expect(titulo).toBeInTheDocument();
    expect(titulo).toHaveTextContent('About Pokédex');
  });
  // Sobre o teste abaixo: https://testing-library.com/docs/react-testing-library/api/
  // The containing DOM node of your rendered React Element
  // (rendered using ReactDOM.render). It's a div. This is a regular DOM node,
  // so you can call container.querySelector etc. to inspect the children.
  it('Testa se existem 2 parágrafos sobre Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragrafo = container.querySelectorAll('p');
    expect(paragrafo).toHaveLength(2);
  });
  // Sobre o teste abaixo: https://react-test.dev/
  // Nesse site eu descobri como usar o "".toHaveAttribute"
  it('Testa se existe uma imagem no componente pelo link da imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imagem = getByRole('img');
    expect(imagem)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
