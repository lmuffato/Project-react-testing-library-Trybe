import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Testando o About', () => {
  test('A página contém um heading', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });

  test('A página contém dois parágrafos', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const pOne = queryByText('This application', { exact: false });
    expect(pOne).toBeInTheDocument();
    const pTwo = queryByText('This application', { exact: false });
    expect(pTwo).toBeInTheDocument();
  });

  test('A página contém a seguinte imagem...', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const img = getByAltText('Pokédex');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
