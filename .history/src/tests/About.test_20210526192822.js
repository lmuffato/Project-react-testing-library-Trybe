import React from 'react';
import About from '../components/About';
import renderWithRouter from '../components/MemoryRouter';

describe('Renders about', () => {
  test('Tests if exits an H2 with the text: About Pokédex ', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2Finder = getByRole('heading', { level: 2 });

    expect(h2Finder).toHaveTextContent('About Pokédex');
  });

  test('Tests if exists two p`s in the component ', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const pFinder = getAllByText(/Pokémons/i);

    expect(pFinder[0]).toBeInTheDocument();
    expect(pFinder[1]).toBeInTheDocument();
  });

  test('Tests if exists an image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgFinder = getByRole('img');
    const imgHttp = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgFinder.src).toContain(imgHttp);
  });
});
