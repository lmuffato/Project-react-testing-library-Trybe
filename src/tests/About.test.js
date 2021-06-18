import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Teste do componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const aboutContent = getByText('This application simulates a Pokédex');
    const title = getByRole('heading', { level: 2, name: 'About Pokédex' });
    const paragraph = getAllByRole('paragraph');
    expect(aboutContent).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(paragraph.length).toBe(2);
  });
  it('Teste se a página contém ilustração da Pokédex.', () => {
    const { getByAltText } = render(
      <MemoryRouter initialEntries={ ['/about'] }>
        <App />
      </MemoryRouter>,
    );
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
