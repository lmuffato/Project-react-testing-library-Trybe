import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes componente PokemonDetails', () => {
  test('Testa se a página contem texto Details', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const headingDetails = screen.getByText(/Pikachu details/i);
    expect(headingDetails).toBeInTheDocument();
  });
  test('Testa se a página contém um Summary', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const summaryHeading = screen.getByText(/Summary/);
    expect(summaryHeading).toBeInTheDocument();
    const pokemonSummary = screen.getByText(/This intelligent Pokémon /);
    expect(pokemonSummary).toBeInTheDocument();
  });
});

describe('Testes componente PokemonDetails - mapas', () => {
  test('Testa se há h2 Game Locations', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const gameLocationsHeading = screen.getByText(/Game locations of Pikachu/i);
    expect(gameLocationsHeading).toBeInTheDocument();
  });
  test('Testa se os mapas de localização são exibidos', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const mapImg = screen.getAllByAltText(/Pikachu location/);
    expect(mapImg[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapImg[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const mapOne = screen.getByText(/Kanto Viridian Forest/i);
    const mapTwo = screen.getByText(/Kanto Power Plant/i);
    expect(mapOne).toBeInTheDocument();
    expect(mapTwo).toBeInTheDocument();
  });
});

describe('Testes componente PokemonDetails - Favoritado?', () => {
  test('Testa se há um checkbox para favoritar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const details = screen.getByText(/More Details/i);
    expect(details).toBeInTheDocument();
    userEvent.click(details);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    const checkboxLabel = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkboxLabel).toBeDefined();
  });
});
