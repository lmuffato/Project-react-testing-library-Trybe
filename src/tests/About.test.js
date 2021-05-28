import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('About.js Testes', () => {
  test('se tem um headind lvl 2', () => {
    const { getByRole } = renderWithRouter(<About />);
    // uso da doc https://testing-library.com/docs/queries/byrole
    const headingText = getByRole('heading', {
      name: /About Pokédex/,
      level: 2,
    });
    expect(headingText).toBeInTheDocument();
  });

  /* nesse caso utilizar o ByRole, se tornará complicado, pois
    a tag P de acordo a doc recomendada do
    https://www.w3.org/TR/html-aria/#docconformance
    não tem role, logo tentaremos utilizar o byText seguido da
    search func */

  test('se há dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const Ps = getAllByText((content, element) => element.tagName.toLowerCase() === 'p'
      && (content.toLowerCase().includes('pokédex')
        || content.toLowerCase().includes('pokémons')));
    expect(Ps).toHaveLength(2);
    // obg murilo pela dica de usar o includes
  });
  test('se há a img com o src indicado no ReadMe', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const altIs = getByAltText('Pokédex');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(altIs.getAttribute('src')).toBe(src);
  });
});
