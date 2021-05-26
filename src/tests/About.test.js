import React from 'react';
import renderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('test About component', () => {
  test('test if the about page contains an h2 called `About Pokédex`', () => {
    const { getByRole, history } = renderWithRouter(<About />);
    history.push('/about');
    const heading = getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('test if the about page contains two paragraphs about the `Pokédex`', () => {
    const { getByText, history } = renderWithRouter(<About />);
    history.push('/about');
    const paragraph = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons by type/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });
  test('test if the about page contains a Pokédex image', () => {
    const { getByAltText, history } = renderWithRouter(<About />);
    history.push('/about');
    const image = getByAltText('Pokédex');
    const imagesrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imagesrc);
  });
});
