import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente "Pokedex"', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const headingH2 = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });

  test('Testa se a pagina contem um botão "Próximo pokémon"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextButton = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();
  });

  test('Testa se a pagina contem um botão "All"', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const pikachu = getByText('Pikachu');
    const allButton = getByRole('button', {
      name: /All/i,
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();
  });

  test('Testa se a pagina contem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonsQuantity = 7;
    const allButtons = getAllByTestId('pokemon-type-button');
    expect(allButtons).toHaveLength(buttonsQuantity);
  });

  test('Testa se o botão de Próximo pokémon é desabilitado'
  + 'quando a lista de Pokémons tiver um só pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonElectric = getByRole('button', {
      name: /Electric/i,
    });
    const nextButton = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(buttonElectric);
    expect(nextButton).toBeDisabled();
  });
});
