import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('testando se o título do componente about renderiza', () => {
  const { getByRole } = renderWithRouter(<About />);
  const aboutTitle = getByRole('heading', { level: 2 });
  expect(aboutTitle).toBeInTheDocument();
  expect(aboutTitle).toHaveTextContent('About Pokédex');
});
test('testando se existe uma imagem sendo renderizada no componente about', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const aboutImage = getByAltText('Pokédex');
  expect(aboutImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
test('testando se a página about contém dois parágrafos', () => {
  const { getByText } = renderWithRouter(<About />);
  const
    p1 = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
  expect(p1).toBeInTheDocument();
});
