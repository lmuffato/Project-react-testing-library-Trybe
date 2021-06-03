import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do requerimento 2', () => {
  it('A página About foi acessada', () => {
    const { history, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  it('Dentro da Tag "h2" contém o texto "About Pokédex"', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    const heading = getAllByRole('heading');

    expect(heading[1].ATTRIBUTE_NODE).toBe(2);

    expect(heading[1].innerHTML).toBe('About Pokédex');
  });

  it('Dois paragrafos, onde um deles cita o termo "Pokédex"', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    const heading2 = getAllByRole('heading')[1].nextSibling;

    expect(heading2.childNodes[0].nodeName).toBe('P');
    expect(heading2.childNodes[0].innerHTML.includes('Pokédex')).toBe(true);
    expect(heading2.childNodes[1].nodeName).toBe('P');
    expect(heading2.childNodes[1].innerHTML.includes('Pokédex')).toBe(false);
  });

  it('Contém uma imagem com endereço especifico', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    const img = getByRole('img');
    const s = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img.src).toBe(s);
  });
});
