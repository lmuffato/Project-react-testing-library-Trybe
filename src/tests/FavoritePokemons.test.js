import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do requisito 3', () => {
  it('Mensagem "No found Favorite Pokemon" foi exibida', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const text = getAllByRole('heading')[1].nextSibling.textContent;
    const path = history.location.pathname;

    expect(path).toBe('/favorites');
    expect(text).toBe('No favorite pokemon found');
  });

  it('Todos os favoritados aparecem na tela', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByRole('checkbox'));

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const favs = getAllByRole('heading')[1].nextSibling.children.length;
    const clas = getAllByRole('heading')[1].nextSibling.childNodes[0].className;

    expect(clas).toBe('favorite-pokemon');
    expect(favs).not.toBe(0);

    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByRole('checkbox'));
  });

  it('Nenhum card exibido porquê nenhum foi favoritado', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const favs2 = getAllByRole('heading')[1].nextSibling.childNodes[0].className;

    expect(favs2).not.toBe('favorite-pokemon');
  });
});
