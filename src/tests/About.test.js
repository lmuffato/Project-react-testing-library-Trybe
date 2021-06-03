import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  it('Teste se a página contém um heading h2 com o texto', () => {
    const { getByText } = renderWithRouter(<About />);
    const headingH2 = getByText('About Pokédex');
    expect(headingH2).toBeInTheDocument();
  });

  it('test if the component About have image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const imageAlt = getByAltText('Pokédex');
    const imagem = 'https://cdn2.bulbagarden.net/upload/thumb/'
    + '8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imageAlt).toHaveAttribute('src', imagem);
  });
});
