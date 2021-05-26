import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('test <About />', () => {
  it('test whether the page contains an h2 heading', () => {
    const { getByRole } = renderWithRouter(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const textHeading = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(textHeading).toBeInTheDocument();
  });

  it('test if there are two paragraphs on the page', () => {
    const { getByText } = renderWithRouter(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const pAbout1 = getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(pAbout1).toBeInTheDocument(); // verifica presença do 1o p.
    const pAbout2 = getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(pAbout2).toBeInTheDocument(); // verifica a presença do 2o p.
  });

  it('test the existence of the correct image', () => {
    const { getByAltText } = renderWithRouter(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const imgSrc = getByAltText('Pokédex').src;
    // console.log(imgSrc);
    expect(imgSrc).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
