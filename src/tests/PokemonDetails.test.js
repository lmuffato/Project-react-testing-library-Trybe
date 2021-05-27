import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

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

const moreDetails = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('deve conter um texto <name> Details, onde <name> é o nome do Pokémon;', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));
    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeDefined();

    const imgLocation = screen.getAllByAltText('Pikachu location');
    expect(imgLocation).toBeDefined();
    expect(imgLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.

    const link = screen.getAllByRole('link');
    expect(link[3]).not.toBeDefined();

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const summaryText = screen.getByText('Summary');
    expect(summaryText).toBeDefined();

    const summaryHeading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summaryHeading).toBeDefined();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.

    const abstract = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(abstract).toBeDefined();
  });

  it('Testa se há mapas contendo as localizações do pokémo', () => {
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido

    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));

    const headPikachu = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(headPikachu).toBeDefined();
  });

  it('Teste se user pode favoritar um pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(moreDetails));

    const checkbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(checkbox).toBeDefined();
  });
});
