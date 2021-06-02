import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokeType = 'pokemon-type';
const pokeName = 'pokemon-name';

function dragonClick() {
  const dragonButton = screen.getByRole('button', { name: /dragon/i });
  userEvent.click(dragonButton);
}
describe('Testa os componentes do cardPokemon', () => {
  test('Testa se o nome e tipo correto do pokemon aparece na tela', () => {
    renderWithRouter(<App />);
    dragonClick();
    const pokemonType = screen.getByTestId(pokeType);
    expect(pokemonType.innerHTML).toBe('Dragon');
    const pokemonName = screen.getByTestId(pokeName);
    expect(pokemonName.innerHTML).toBe('Dragonair');
  });
  test('O peso médio pokémon deve ser exibido com um texto no formato certo', () => {
    renderWithRouter(<App />);
    dragonClick();
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.innerHTML).toBe('Average weight: 16.5 kg');
  });
  test('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    dragonClick();
    const pokemonName = screen.getByTestId(pokeName).innerHTML;
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    expect(image).toHaveAttribute('alt', `${pokemonName} sprite`);
  });
  test('Se possui link de exibir detalhes', () => {
    renderWithRouter(<App />);
    dragonClick();
    const idDragonClick = 148;
    const linkDetails = screen.getByRole('link', {
      name: 'More details',
    });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', `/pokemons/${idDragonClick}`);
    // Poderia refatorar, em função do idDragonclick
  });
  test('Se ao clicar em exibir detalhes redireciona para devida pagina', () => {
    const { history } = renderWithRouter(<App />);
    dragonClick();
    const linkDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkDetails);
    const pokeDetails = screen.getByText('Dragonair Details');
    const summary = screen.getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(pokeDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });
  test('Se clicar em exibir detalhes deve redirecionar p/ url especifica', () => {
    const { history } = renderWithRouter(<App />);
    dragonClick();
    const linkDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/148');
  });
  test('testa a imagem da estrela de favoritado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/148');
    const favorite = screen.getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const favoritado = screen.getByRole('checkbox', { checked: true });
    expect(favoritado).toBeInTheDocument();
    const star = screen.getByRole('img', {
      name: 'Dragonair is marked as favorite',
    });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
