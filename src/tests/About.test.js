import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('testando', () => {
  const { getByText } = render(<About />);
  const tit = getByText('About Pokédex');

  expect(tit).toBeInTheDocument();
});

test('Verificando src img', () => {
  const { getByAltText } = render(<About />);
  const img = getByAltText('Pokédex');
  const pathImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(img).toHaveAttribute('src', pathImg);
});