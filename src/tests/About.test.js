import React from 'react';
import renderWithRouter from './RenderWithRouter';
import { aboutData } from '../services/dataTest';
import About from '../components/About';

/**
 * Consutei o repositório do Renzo Sevilha para fazer esses testes.
 * Link: https://github.com/tryber/sd-010-a-project-react-testing-library/blob/c364287f50ba28cd493c346141338c074f7aaea0/src/services/dataTest.js
 */
describe('Testa o "About"', () => {
  const { pokedexInfos, imgSrc } = aboutData;

  it('Testa se a página contém "Heading Pokémons"', () => {
    const { getByRole } = renderWithRouter(<About />);

    const heading = getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém textos sobre os Pokémons', () => {
    const { getByText } = renderWithRouter(<About />);

    pokedexInfos.forEach((info) => {
      const texts = getByText(info);
      expect(texts).toBeInTheDocument();
    });
  });

  it('Testa se rederiza as imagens dos Pokémons', () => {
    const { getByRole } = renderWithRouter(<About />);

    const img = getByRole('img', {
      name: /pokédex/i,
    });
    expect(img).toHaveAttribute('src', imgSrc);
  });
});
