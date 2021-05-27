import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1.1', () => {
  const mesage = 'Teste se a página principal da Pokédex é renderizada na URL /';
  it(mesage, () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    expect(pathname).toBe('/');
  });
});
describe('Requisito 1.2 Teste se existe um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    const links = nav.getElementsByTagName('a');
    expect(links[0].innerHTML).toBe('Home');
  });
  it('O segundo link deve possuir o texto About.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    const links = nav.getElementsByTagName('a');
    expect(links[1].innerHTML).toBe('About');
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nav = getByRole('navigation');
    const links = nav.getElementsByTagName('a');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});

// describe('Requisito 1.3', () => {
//   const mesage = '';
//   it(mesage, () => {
//     const { } = renderWithRouter(<App />);
//     expect().toBe();
//   });
// });

// describe('Requisito 1.4', () => {
//   const mesage = '';
//   it(mesage, () => {
//     const { } = renderWithRouter(<App />);
//     expect().toBe();
//   });
// });

// describe('Requisito 1.5', () => {
//   const mesage = '';
//   it(mesage, () => {
//     const { } = renderWithRouter(<App />);
//     expect().toBe();
//   });
// });

// describe('Requisito 1.6', () => {
//   const mesage = '';
//   it(mesage, () => {
//     const { } = renderWithRouter(<App />);
//     expect().toBe();
//   });
// });

/*
Teste o componente <App.js />
1-Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /.

2 Teste se o topo da aplicação contém um conjunto fixo de links de navegação.

O primeiro link deve possuir o texto Home.

O segundo link deve possuir o texto About.

O terceiro link deve possuir o texto Favorite Pokémons.

3-Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.

4-Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.

5-Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.

6-Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.

O que será verificado:

Será avaliado se o arquivo teste App.test.js contemplam 100% dos casos de uso criados pelo Stryker.
*/
