import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Tests the home page', () => {
  test('shows about when the route is `/about`', () => {
    render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <About />
      </MemoryRouter>,
    );

    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  test('renders a heading with the text `About Pokédex`', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/^About Pokédex$/i);
    expect(heading).toBeInTheDocument();
  });

  test('Verifica se há 2 parágrafos com informações sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    expect(screen.getAllByText(/Pokémons/i)).toHaveLength(2);
  });

  test('deve renderizar uma imagem com URL específica', () => {
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', srcImg);
  });
});
