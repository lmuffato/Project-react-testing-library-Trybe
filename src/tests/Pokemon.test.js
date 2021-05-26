import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

describe('Pokemon.test', () => {
  const maisDetalhes = 'More details';
  it('testing, name, type, averageWeight, image, and details  ', () => {
    const { getByText, getAllByText, getByRole, container } = renderWithRouter(<App />);

    const botaoProximo = getByText('Próximo pokémon');
    const linkMoreDetails = getByText(maisDetalhes);

    data.forEach((pokemon) => {
      const card = container.querySelectorAll('.pokemon');
      const nomePokemon = getByText(pokemon.name);
      const typePokemo = getAllByText(pokemon.type)[1];
      const valor = pokemon.averageWeight.value;
      const unidade = pokemon.averageWeight.measurementUnit;
      const averageWeight = getByText(
        `Average weight: ${valor} ${unidade}`,
      );
      const imagem = getByRole('img');

      expect(linkMoreDetails.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
      expect(imagem).toHaveAttribute('src', pokemon.image);
      expect(imagem).toHaveAttribute('alt', `${pokemon.name} sprite`);
      expect(typePokemo).toBeInTheDocument();
      expect(nomePokemon).toBeInTheDocument();
      expect(averageWeight).toBeInTheDocument();
      expect(card.length).toBe(1);
      userEvent.click(botaoProximo);
    });
  });

  it('testing click linkDetails', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(maisDetalhes);
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${data[0].id}`);
  });

  it('favor pokemon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    data.forEach((pokemon, index) => {
      for (let i = 0; i < index; i += 1) {
        const botaoProximo = getByText('Próximo pokémon');
        userEvent.click(botaoProximo);
      }

      const linkDetails = getByText(maisDetalhes);
      userEvent.click(linkDetails);

      const favoritar = getByText('Pokémon favoritado?');
      userEvent.click(favoritar);

      const image = getByAltText(`${pokemon.name} is marked as favorite`);
      expect(image).toHaveAttribute('src', '/star-icon.svg');
      expect(image).toBeInTheDocument();
      userEvent.click(getByText('Home'));
    });
  });
});
