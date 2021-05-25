import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testando o componente App.js', () => {
  it('A página Pokédex é renderizada no caminho de URL /', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });

    expect(heading).toBeInTheDocument();
  });

  it('A pagina contém links de navegação Home, About e Favorite Pokémons', () => {
    // Escreva o teste aqui
  });

  it('Ao clicar no link Home, é redirecionado para pagina inicial URL /', () => {
    // Escreva o teste aqui
  });

  it('Ao clicar no link About, é redirecionado para URL /about', () => {
    // Escreva o teste aqui
  });

  it('Ao clicar no link Favorite Pokémons, é redirecionado para URL /favorites', () => {
    // Escreva o teste aqui
  });

  it('URL desconhecida redireciona para página Not Found', () => {
    // Escreva o teste aqui
  });
});
