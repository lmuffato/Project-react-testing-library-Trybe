import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requirement 02 About tests', () => {
  it('test if the component About have Pokedéx information', () => {
    const { getByText } = renderWithRouter(
      <About />,
    );
    const h2Info = getByText('About Pokédex');
    expect(h2Info).toBeInTheDocument();
  });
  it('test if the component About have image', () => {
    const { getByAltText } = renderWithRouter(
      <About />,
    );
    const imageAlt = getByAltText('Pokédex');
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/'
    + '8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imageAlt).toHaveAttribute('src', image);
  });
});
