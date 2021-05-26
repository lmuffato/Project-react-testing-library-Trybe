import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const moreDetails = 'More details';

describe('Testing PokemonDetails Component', () => {
  it('Teste se as info detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(<Router history={ history }><App /></Router>);
    const detailsBtn = getByRole('link', { name: moreDetails });
    userEvent.click(detailsBtn);
    const heading = getByRole('heading', { name: 'Pikachu Details' });
    expect(heading).toBeInTheDocument();
    expect(() => getByRole('link', { name: moreDetails })
      .toThrow('Unable to find an element'));
    const summaryHeading = getByRole('heading', { name: 'Summary' });
    expect(summaryHeading).toBeInTheDocument();
    const paragraph = (
      getByText(
        /This intelligent Pokémon roasts hard berries with electricity to make them/,
      )
    );
    expect(paragraph).toBeInTheDocument();
  });
  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const history = createMemoryHistory();
    const { getByRole, getAllByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsBtn = getByRole('link', { name: moreDetails });
    userEvent.click(detailsBtn);
    const mapHeading = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(mapHeading).toBeInTheDocument();
    const allMaps = getAllByRole('img', { name: 'Pikachu location' });
    expect(allMaps.length).toBe(2);
    expect(allMaps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allMaps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Test se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsBtn = getByRole('link', { name: moreDetails });
    userEvent.click(detailsBtn);
    const checkBox = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkBox).toBeInTheDocument();
  });
});
