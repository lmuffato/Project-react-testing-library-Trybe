import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import App from '../App';

const { MemoryRouter } = require('react-router');

describe('testa pagina sobre a pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const about = getByRole('link', { name: /about/i });
    fireEvent.click(about);

    const title = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const paragraph = container.getElementsByTagName('p');
    expect(paragraph[0]).toBeInTheDocument();
    expect(paragraph[1]).toBeInTheDocument();
  });

  test('Teste se a página contém imagem do link,com uma Pokédex', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const img = getByAltText('Pokédex');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});