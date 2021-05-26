import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Pokemon from '../components/Pokemon';

describe('Testes componente Pokemon - renderiza card', () => {
  test('Testa se o nome correto do pokemon é mostrado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toContainHTML('Pikachu');
  });
  test('Testa o tipo do pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toContainHTML('Electric');
  });
  test('Testa o peso do pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toContainHTML('Average weight: 6.0 kg');
  });
  test('Testa a imagendo pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toContain('Pikachu sprite');
  });
});

describe('Testes componente Pokemon - link', () => {
  test('Testa se card contém link de detalhes', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    expect(details.href).toContain('/pokemons/25');
  });
});

describe('Testes componente Pokemon - favoritos', () => {
  test('Testa se existe um ícone de estrela', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const starElement = screen.getByAltText('Pikachu is marked as favorite');
    expect(starElement).toBeInTheDocument();
    expect(starElement.src).toContain('/star-icon.svg');
  });
});
