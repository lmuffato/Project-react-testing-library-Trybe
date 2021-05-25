import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('2. Testando componente <About />', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const aboutHeading = getByText('About Pokédex');
    expect(aboutHeading).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {});
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {});
  test('Teste se a página contém a imagem de uma Pokédex:', () => {});
});
