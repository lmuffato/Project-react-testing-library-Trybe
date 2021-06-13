import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter ';
import App from '../App';

const mew = '/pokemons/151';
const mewLocation = 'Mew location';
describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('Testa se o nome do Pokémon é exibido e não há link para mais detalhes', () => {
    const { getByText, queryByText, history } = renderWithRouter(<App />);
    history.push(mew);
    const name = getByText('Mew Details');
    const moreDetails = queryByText('More Details');
    expect(name).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push(mew);
    const titulo = getByRole('heading', { level: 2, name: 'Summary' });
    expect(titulo).toBeInTheDocument();
    const resumo = getByText(/those people who are pure of heart/i);
    expect(resumo).toBeInTheDocument();
  });
  it('Testa se contém uma seção com os mapas e a localização do pokémon', () => {
    const { getByRole, getByAltText, getByText, history } = renderWithRouter(<App />);
    history.push(mew);
    const titulo = getByRole('heading', { level: 2, name: 'Game Locations of Mew' });
    expect(titulo).toBeInTheDocument();
    const resumo = getByAltText(mewLocation);
    expect(resumo).toBeInTheDocument();
    const local = getByText('Faraway Island');
    expect(local).toBeInTheDocument();
  });
  it('Testa se contém uma seção com os mapas e a localização do pokémon', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push(mew);
    const imgLocal = getByAltText(mewLocation);
    expect(imgLocal)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
    expect(imgLocal)
      .toHaveAttribute('alt', mewLocation);
  });

  it('Testa se o usuário pode favoritar um Pokémon na página de detalhes', () => {
    const { getByRole, getByAltText, history } = renderWithRouter(<App />);
    history.push(mew);
    const favorito = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorito);
    const star = getByAltText('Mew is marked as favorite');
    expect(star)
      .toHaveAttribute('src', '/star-icon.svg');
    expect(star)
      .toHaveAttribute('alt', 'Mew is marked as favorite');
  });
});
