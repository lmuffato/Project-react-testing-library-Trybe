import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App component', () => {
  test('Contains 2 paragraphs in about', async () => {
    const {
      getByText,
      getAllByText,
      history,
    } = renderWithRouter(<App />);
    history.push('/about');

    const navigateAbout = getByText(/About Pokédex/i);
    expect(navigateAbout).toBeInTheDocument();

    const paragraphs1 = getAllByText(/Pokémons/i)[1];
    const paragraphs2 = getAllByText(/Pokémons/i)[2];

    expect(paragraphs1).toBeInTheDocument();
    expect(paragraphs2).toBeInTheDocument();
  });

  test('Contains heading h2 in about', async () => {
    const {
      getByText,
      getByRole,
      history,
    } = renderWithRouter(<App />);
    history.push('/about');

    const navigateAbout = getByText(/About Pokédex/i);
    expect(navigateAbout).toBeInTheDocument();

    const aboutText = getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(aboutText).toBeInTheDocument();
  });

  test('Contains image link in about', async () => {
    const {
      getByText,
      getByAltText,
      history,
    } = renderWithRouter(<App />);
    history.push('/about');

    const navigateAbout = getByText(/About Pokédex/i);
    expect(navigateAbout).toBeInTheDocument();

    const image = getByAltText('Pokédex');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toContain(url);
  });
});
