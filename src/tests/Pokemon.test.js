import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import alias from './utils/alias';
import renderWithRouter from './utils/renderWithRouter';

import App from '../App';

describe('Testes para o componente "Pokemon.js"', () => {
  const { expectToBeInTheDocument, link, checkIfIsRedirected } = alias;

  const pokemon = {
    name: () => screen.getByTestId('pokemon-name'),
    type: () => screen.getByTestId('pokemon-type'),
    weight: () => screen.getByTestId('pokemon-weight'),
    image: () => screen.getByRole('img', {
      name: `${pokemon.name().textContent} sprite`,
    }),
    detailsLink: () => link(/more details/i),
  };

  test('É renderizado um card com as informações de determinado pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const filterPsychic = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(filterPsychic);

    expectToBeInTheDocument(
      pokemon.image(),
      pokemon.name(),
      pokemon.type(),
      pokemon.weight(),
      pokemon.detailsLink(),
    );

    expect(pokemon.name().textContent).toBe('Alakazam');

    expect(pokemon.type().textContent).toBe('Psychic');

    expect(pokemon.weight().textContent).toBe('Average weight: 48.0 kg');

    expect(pokemon.image().src).toBe('https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');

    userEvent.click(pokemon.detailsLink());

    expect(history.location.pathname).toBe('/pokemons/65');
  });

  test('Ao clicar no link de navegação do Pokémon, é feito o'
  + ' redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    checkIfIsRedirected({
      from: '/',
      to: '/pokemons/25',
      event: () => userEvent.click(pokemon.detailsLink()),
      history,
    });
  });

  test('Existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    userEvent.click(pokemon.detailsLink());
    userEvent.click(screen.getByLabelText(/pokémon favoritado/i));
    userEvent.click(link('Home'));

    const img = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });

    expect(`/${img.src.split('/')[3]}`).toBe('/star-icon.svg');
    expectToBeInTheDocument(img);
  });
});
