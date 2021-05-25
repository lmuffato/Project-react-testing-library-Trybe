import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        { component }
      </Router>,
    ),
    history,
  });
};

describe('Testa o componente <About.js>', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const abt = getByText(/This application simulates a Pokédex/i);
    expect(abt).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    const heading = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const paragOne = getByText(/This application simulates a Pokédex/i);
    expect(paragOne).toBeInTheDocument();

    const paragTwo = getByText(/One can filter Pokémons by type/i);
    expect(paragTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole, getByAltText } = render(<About />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    const imgAlt = getByAltText('Pokédex');
    expect(imgAlt).toBeInTheDocument();
  });
});
