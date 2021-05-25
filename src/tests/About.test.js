import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('este o componente <About.js />', () => {
  test('Se a página contém as informações sobre a Pokédex.', () => {
    const { getByText, history } = renderWithRouter(<About />);
    history.push('/about');
    const about = getByText(/This application/i);
    expect(about).toBeInTheDocument();
  });
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<About />);
    history.push('/about');
    const titlePage = getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(titlePage).toBeInTheDocument();
  });
  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const p = document.getElementsByTagName('p');
    expect(p).toHaveLength(2);
  });
  test('Se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole, history } = renderWithRouter(<About />);
    history.push('/about');
    const src = 'https://cdn2.bulbagarden.netw/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const searchImg = getByRole('img');
    expect(searchImg.src).toBe(src);
  });
});
