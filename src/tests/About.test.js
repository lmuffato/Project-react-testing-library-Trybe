import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

const p1 = 'This application simulates a Pokédex, a digital encyclopedia containing '
+ 'all Pokémons';
const p2 = 'One can filter Pokémons by type, and see more details for each one of them';
const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Verifica se o componente About ', () => {
  it('contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const element = screen.getByRole('heading', { level: 2 });
    expect(element).toHaveTextContent('About Pokédex');
  });

  it('contém dois parágrafos com as informações sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent(p1);
    expect(paragraphs[1]).toHaveTextContent(p2);
  });

  it('contém informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toBe(src);
  });
});
