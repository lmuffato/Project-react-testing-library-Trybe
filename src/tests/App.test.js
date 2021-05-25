import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Testando se a página e carregada no caminho de URL /, e os links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFavorite).toBeInTheDocument();
  });
});
