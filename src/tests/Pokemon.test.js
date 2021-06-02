import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('ver se é renderizado um card com as informações do pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);

    const card = getByTestId('pokemon-name');
    const card1 = getByTestId('pokemon-type');
    const card2 = getByTestId('pokemon-weight');
    const card3 = getByAltText(/sprite*/); // regex * captura palavra dentro de qqr frase
    const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(card.innerHTML).toBe('Pikachu');
    expect(card1).toHaveTextContent(pokemons[0].type);
    expect(card2).toHaveTextContent('Average weight: 6.0 kg');
    expect(card3).toHaveAttribute('src', img);
  });

  it('Se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />); // pokemon e isFavorite são as props obrigatorias do componente Pokemon

    const favIcon = getByAltText(/is marked as favorite/i);
    const starIcon = '/star-icon.svg';

    expect(favIcon).toHaveAttribute('src', starIcon);
  });

  it('Se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);

    const linkMoreDetails = getByText(/More Details/i);

    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);
    const { pathname } = history.location; // busca pela url

    expect(pathname).toBe('/pokemons/25'); // url
  });
});
