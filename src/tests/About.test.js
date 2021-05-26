import React from 'react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('2. Testando componente <About />', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);

    const aboutHeading = getByText('About Pokédex');
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const pageTitle = getByRole('heading', { level: 2 });
    expect(pageTitle).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);

    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
  });

  test('Teste se a página contém a imagem de uma Pokédex:', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imagePath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByAltText('Pokédex');
    expect(image.src).toContain(imagePath);
  });
});
