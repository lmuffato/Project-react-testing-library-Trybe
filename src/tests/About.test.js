import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

// npx stryker run ./stryker/About.conf.json

describe('requisito 2', () => {
  test('verifica se existe o subtítulo e paragráfo', () => {
    render(<About />);
    const heading = screen.getByText('About Pokédex');
    expect(heading).toBeInTheDocument();

    // captura o texto do primeiro paragrafo para testa-lo na expect
    const paragrafo = screen
      .getByText('This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons');
    // captura o texto do segundo paragrafo para testa-lo na expect
    const SegParagrafo = screen
      .getByText('One can filter Pokémons by type, '
      + 'and see more details for each one of them');

    expect(paragrafo).toBeInTheDocument();
    expect(SegParagrafo).toBeInTheDocument();
  });

  test('testa se contém uma imagem', () => {
    render(<About />);
    const image = screen.getByRole('img');
    const imageSoruce = image.src;
    const source = 'https://cdn2.bulbagarden.net/upload'
    + '/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imageSoruce).toEqual(source);
  });
});
