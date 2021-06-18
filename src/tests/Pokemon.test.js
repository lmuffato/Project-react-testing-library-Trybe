import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requisito 6 Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByRole, getByAltText } = renderWithRouter(<App />);
    const pokeName = getByTestId('pokemon-name');
    const pokeType = getByTestId('pokemon-type');
    const pokeWeight = getByTestId('pokemon-weight');
    const img = getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const imgAlt = getByAltText(/pikachu sprite/i);

    expect(pokeName).toHaveTextContent(/pikachu/i);
    expect(pokeType).toHaveTextContent(/Electric/i);
    expect(pokeWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(img.src).toBe(src);
    expect(imgAlt.src).toBe(src);
  });

  it('Teste se ao clicar no link, redirecionamento para a página de detalhes', () => {
    const { getByText, history, getByAltText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);

    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const { pathname } = history.location;
    userEvent.click(getByText(/favoritado/i));
    const favoritePoke = getByAltText(/pikachu is marked as favorite/i);

    expect(pathname).toBe('/pokemons/25');
    expect(favoritePoke).toBeInTheDocument();
    expect(favoritePoke.src).toMatch(/star-icon.svg/i);
  });
});
