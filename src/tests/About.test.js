import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('página contém as informações sobre a Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('página contém um heading h2 com o texto About Pokédex', () => {
  render(<About />);
  const headingPage = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(headingPage).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);
  const paragrafos = container.querySelectorAll('p');
  expect(paragrafos.length).toBe(2);
});

test('Teste se a página contém imagem', () => {
  const { getByAltText } = render(<About />);
  const image = getByAltText('Pokédex');
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
