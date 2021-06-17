import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requisito 5 Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2Text = getByRole('heading', { level: 2, name: /Encountered pokémons/i });

    expect(h2Text).toBeInTheDocument();
  });

  it('Teste se ao clicar no botão Próximo pokémon é exibido o próximo Pokémon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const btn = getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(getByText(/Próximo pokémon/i));

    expect(btn).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    userEvent.click(getByText(/All/i));
    const card = getByTestId('pokemon-name');

    expect(card).toHaveTextContent('Pikachu');

    userEvent.click(getByText(/Psychic/i));
    const poke = getByText(/Alakazam/i);

    expect(poke).toBeInTheDocument();

    const btn = getAllByTestId(/pokemon-type-button/i);
    const totalButtons = 7;

    expect(btn).toHaveLength(totalButtons);
  });
});
