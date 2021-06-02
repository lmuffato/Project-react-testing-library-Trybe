// import React from 'react';
// import { fireEvent } from '@testing-library/react';
// import renderWithRouter from '../renderWithRouter';
// import App from '../App';

// describe('Testa o link Home na aplicação', () => {
//   it('Deve existir o link Home na página inicial.', () => {
//     const { getByText } = renderWithRouter(<App />);
//     const homeLink = getByText(/Home/);
//     expect(homeLink).toBeInTheDocument();
//   });

//   it('Ao clicar no link Home, deve acessar a página inicial.', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     const homeLink = getByText(/Home/);
//     fireEvent.click(homeLink);
//     const urlPathname = history.location.pathname;
//     expect(urlPathname).toBe('/');
//   });
// });

// describe('Testa o link About na aplicação', () => {
//   it('Deve existir o link About na página inicial.', () => {
//     const { getByText } = renderWithRouter(<App />);
//     const homeLink = getByText(/About/);
//     expect(homeLink).toBeInTheDocument();
//   });

//   it('Ao clicar no link About, deve acessar a página About.', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     const homeLink = getByText(/About/);
//     fireEvent.click(homeLink);
//     const urlPathname = history.location.pathname;
//     expect(urlPathname).toBe('/about');
//   });
// });

// describe('Testa o link Favorite Pokémons na aplicação', () => {
//   it('Deve existir o link Favorite Pokémons na página inicial.', () => {
//     const { getByText } = renderWithRouter(<App />);
//     const homeLink = getByText(/Favorite Pokémons/);
//     expect(homeLink).toBeInTheDocument();
//   });

//   it('Ao clicar no link Favorite Pokémons, deve acessar a página favorite.', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     const homeLink = getByText(/Favorite Pokémons/);
//     fireEvent.click(homeLink);
//     const urlPathname = history.location.pathname;
//     expect(urlPathname).toBe('/favorites');
//   });
// });

// describe('Testa a página Not Found em URLs desconhecidas.', () => {
//   it('Ao inserir uma URL desconhecida, direciona para a página Not Found.', () => {
//     const { getByText, history } = renderWithRouter(<App />);
//     history.push('/not-valid-url');
//     const urlPathname = history.location.pathname;
//     expect(urlPathname).toBe('/not-valid-url');
//     const messageInNotFoundPage = getByText(/Page requested not found/i);
//     expect(messageInNotFoundPage).toBeInTheDocument();
//   });
// });
