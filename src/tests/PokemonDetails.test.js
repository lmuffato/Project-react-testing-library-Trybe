import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// Seletores: https://testing-library.com/docs/react-testing-library/cheatsheet
// Exemplos de uso: https://testing-library.com/docs/react-testing-library/example-intro/

// Eslint pediu que criasse as constantes abaixo pois os termo se repetem várias vezes
const mew = '/pokemons/151';
const altMew = 'Mew location';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  // Sobre o teste abaixo: https://testing-library.com/docs/guide-disappearance
  // Esse link explica sobre o ".not.toBeInTheDocument()"
  it('Testa se o nome do Pokémon é exibido e não há link para mais detalhes', () => {
    const { getByText, queryByText, history } = renderWithRouter(<App />);
    history.push(mew);
    const nomeDoPoke = getByText('Mew Details');
    const maisDetalhes = queryByText('More Details');
    expect(nomeDoPoke).toBeInTheDocument();
    expect(maisDetalhes).not.toBeInTheDocument();
  });
  it('Testa se detalhes contém um heading h2 com o texto Summary e um resumo', () => {
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
    const resumo = getByAltText(altMew);
    expect(resumo).toBeInTheDocument();
    const local = getByText('Faraway Island');
    expect(local).toBeInTheDocument();
  });
  it('Testa se contém uma seção com os mapas e a localização do pokémon', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push(mew);
    const imagemDoLocal = getByAltText(altMew);
    expect(imagemDoLocal)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
    expect(imagemDoLocal)
      .toHaveAttribute('alt', altMew);
  });
  // Sobre o teste abaixo: Similar ao teste feito no arquivo Pokemon.test.js
  it('Testa se o usuário pode favoritar um Pokémon na página de detalhes', () => {
    const { getByRole, getByAltText, history } = renderWithRouter(<App />);
    history.push(mew);
    const favoritado = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoritado);
    const estrela = getByAltText('Mew is marked as favorite');
    expect(estrela)
      .toHaveAttribute('src', '/star-icon.svg');
    expect(estrela)
      .toHaveAttribute('alt', 'Mew is marked as favorite');
  });
});
