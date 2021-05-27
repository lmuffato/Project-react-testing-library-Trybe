import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const typeSnorlaxOnURL = '/pokemons/143';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        { component }
      </Router>,
    ),
    history,
  });
};

describe('Testa o componente <About.js>', () => {
  it('O nome e tipo correto do Pokémon deve ser mostrado na tela;', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(typeSnorlaxOnURL);
    const snorlaxOnScreen = getByText('Snorlax Details');
    expect(snorlaxOnScreen).toBeInTheDocument();

    // O tipo correto do pokémon deve ser mostrado na tela.
    const snorlaxOnScreenType = getByText('Normal');
    expect(snorlaxOnScreenType).toBeInTheDocument();
  });

  it('O peso médio do pokémon deve ser exibido ... ', () => {
  // Continuação: O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    const { getByText, getByAltText, history } = renderWithRouter(<App />);
    history.push(typeSnorlaxOnURL);
    const snorlaxWeight = getByText('Average weight: 460.0 kg');
    expect(snorlaxWeight).toBeInTheDocument();

    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon

    const img = getByAltText('Snorlax sprite');
    expect(img).toBeInTheDocument();
  });

  it('Possui link de navegação? ;', () => {
    // ...para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido
    const { getByRole, history } = renderWithRouter(<App />);
    const link = getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();

    const getNormalButton = getByRole('button', { name: 'Normal' });
    userEvent.click(getNormalButton);
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe(typeSnorlaxOnURL);
  });

  it('Testa caminhos, links e Estrela Favoritos, ', () => {
    const {
      getByText,
      getByRole,
      getByAltText,
      getByTestId,
      history } = renderWithRouter(<App />);

    history.push('pokemons/23');
    const getEkans = getByText('Ekans Details');
    expect(getEkans).toBeDefined();

    const getEkansSprite = getByAltText('Ekans sprite');
    expect(getEkansSprite).toBeDefined();

    // Teste se existe um ícone de estrela nos Pokémons favoritados:
    // 'O ícone deve ser uma imagem com src contendo o caminho /star-icon.svg;'
    const checkbox = getByRole('checkbox');
    userEvent.click(checkbox);
    const starIcon = getByAltText('Ekans is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    const ekansSprite = getByAltText('Ekans sprite');
    expect(ekansSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');

    // Após marcado como favoritos, verifica nome e tipo do pokemon favoritado
    history.push('/favorites');
    const pokName = getByTestId('pokemon-name');
    expect(pokName).toBeDefined();
    expect(pokName).toHaveTextContent('Ekans');

    const pokType = getByTestId('pokemon-type');
    expect(pokType).toHaveTextContent('Poison');
  });
});
