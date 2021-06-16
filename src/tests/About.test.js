import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';

import App from '../App';

describe('Requisito 2 testa o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const about = getByText('About');
    userEvent.click(about);
    const elementh2 = getByRole('heading', { name: 'About Pokédex', level: 2 });
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons by type/i);
    const img = getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(elementh2).toBeInTheDocument();
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
    expect(img.src).toBe(src);
  });
});
