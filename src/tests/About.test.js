import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa se a página contém as informações sobre a Pokédex', () => {
  it('Testa se existe um h2 na pagina com o texto ', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/about');

    const aboutText = getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(aboutText).toBeInTheDocument();
  });

  it('Testa se existe dois paragrafos com uma descriçao do projeto', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/about');

    const mytext1 = getByText(
      'This application simulates a Pokédex, a '
      + 'digital encyclopedia containing all Pokémons',
    );
    expect(mytext1).toBeInTheDocument();

    const mytext2 = getByText(
      'One can filter Pokémons by type, and see more '
      + 'details for each one of them',
    );
    expect(mytext2).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/about');

    const myImage = getByRole('img', {
      name: /Pokédex/i,
    });
    expect(myImage).toBeInTheDocument();
  });

  it('Testa se o src da imagem e o esperado', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/about');

    const myImage = getByRole('img', {
      name: /Pokédex/i,
    });
    expect(myImage.src).toBe('https://cdn2.bulbagarden.net/upload/'
    + 'thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
