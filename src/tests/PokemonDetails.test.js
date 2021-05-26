import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';

/**
 * Consultei o repositório da Ana Luiza para fazer os testes do <PokemoDetails />
 * Link: https://github.com/tryber/sd-09-project-react-testing-library/pull/18/commits/f304b436438534c976334641ea93ec544caee822
 */
describe('Testa <PokemonDetails.js />', () => {
  const button = 'More details';
  it('Testa se renderiza as informações do pokemon', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = getByText(button);
    userEvent.click(link);
    const details = getByText('Pikachu Details');
    expect(details).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    const heading = getByRole('heading', { level: 2, name: 'Summary' });
    expect(heading).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Testa se renderiza uma seção com mapas de localização pokémon', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = getByText(button);
    userEvent.click(link);
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    const maps = getAllByAltText('Pikachu location');
    expect(maps).toHaveLength(2);
    maps.forEach((location, index) => {
      expect(location).toHaveAttribute('src', data[0].foundAt[index].map);
    });
  });

  it('Testa se pokemon pode ser favoritado', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const link = getByText(button);
    userEvent.click(link);
    const favorite = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favorite).not.toBeChecked();
    userEvent.click(favorite);
    expect(favorite).toBeChecked();
  });
});
