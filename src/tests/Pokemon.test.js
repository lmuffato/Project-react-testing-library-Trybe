import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';
import App from '../App';

// Seletores: https://testing-library.com/docs/react-testing-library/cheatsheet
// Exemplos de uso: https://testing-library.com/docs/react-testing-library/example-intro/

// Onde houver "<Pokemon pokemon={ pokemons[5] } />" significa que o Pokémon
// escolhido (Mew) foi informado por Props ao componente Pokemon
// Este Pokemon está na posição [5] do array dentro do arquivo data.js

describe('6. Teste o componente <Pokemon.js />', () => {
  // Sobre os 3 testes iniciais abaixo na parte relacionada a ".textContent":
  // https://developer.mozilla.org/pt-BR/docs/Web/API/Node/textContent
  // https://www.w3schools.com/jsref/prop_node_textcontent.asp
  it('Testa se o NOME correto do Pokémon é mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[5] } />);
    const nomeDoPoke = getByTestId('pokemon-name');
    expect(nomeDoPoke.textContent).toContain('Mew');
  });
  it('Testa se o TIPO correto do Pokémon é mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[5] } />);
    const tipoDoPoke = getByTestId('pokemon-type');
    expect(tipoDoPoke.textContent).toContain('Psychic');
  });
  it('Testa se o PESO MÉDIO correto do Pokémon é mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[5] } />);
    const pesoDoPoke = getByTestId('pokemon-weight');
    expect(pesoDoPoke.textContent).toContain('Average weight: 4.0 kg');
  });
  // Sobre o teste abaixo: https://react-test.dev/
  // Nesse site eu descobri como usar o ".toHaveAttribute"
  // O mesmo ".toHaveAttribute" foi usado no teste do componente About.js
  it('Testa se a IMAGEM correta do Pokémon é mostrado na tela', () => {
    const { getByRole } = renderWithRouter(<Pokemon pokemon={ pokemons[5] } />);
    const imagemDoPoke = getByRole('img');
    expect(imagemDoPoke)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png');
    expect(imagemDoPoke)
      .toHaveAttribute('alt', 'Mew sprite');
  });
  it('Testa se existe um link de navegação para exibir detalhes', () => {
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemons[5] } />);
    const maisDetalhes = getByText(/More Details/i);
    expect(maisDetalhes).toBeInTheDocument();
  });
  it('Testa se o link de navegação encaminha para a página correta', () => {
    const { getByText, history } = renderWithRouter(<Pokemon pokemon={ pokemons[5] } />);
    const maisDetalhes = getByText(/More Details/i);
    userEvent.click(maisDetalhes);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/151');
  });
  // Também usei "history.push" no arquivo App.test.js para mudar a URL
  it('Testa se o Pokémon foi favoritado', () => {
    const { getByAltText, getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    const favoritado = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoritado);
    const estrela = getByAltText('Mew is marked as favorite');
    expect(estrela)
      .toHaveAttribute('src', '/star-icon.svg');
    expect(estrela)
      .toHaveAttribute('alt', 'Mew is marked as favorite');
  });
});
