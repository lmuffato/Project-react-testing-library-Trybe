import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

const renderAboutWithRouter = () => renderWithRouter(<About />);

describe('About.test.js', () => {
  test('Verifica se há informações sobre a pokedex', () => {
    const { getByRole, getByText } = renderAboutWithRouter();
    const AboutTitle = getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(AboutTitle).toBeInTheDocument();
    const paragraphers = [];
    let text1 = 'This application simulates a Pokédex,';
    text1 += ' a digital encyclopedia containing all Pokémons';
    let text2 = 'One can filter Pokémons by type,';
    text2 += ' and see more details for each one of them';
    paragraphers.push(getByText(text1));
    paragraphers.push(getByText(text2));
    paragraphers.forEach((paragraph) => expect(paragraph).toBeInTheDocument());
    expect(paragraphers.length).toBe(2);
  });
  test('Verfica se há uma imagem que tem como fonte um Link definido', () => {
    const { getByRole } = renderAboutWithRouter();
    const aboutImageSrc = getByRole('img').getAttribute('src');
    const imageLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(aboutImageSrc).toBe(imageLink);
  });
});
