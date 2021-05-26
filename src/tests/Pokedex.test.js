import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/helper';
import data from '../data';

describe('Pokedex', () => {
  it('página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const text = getByRole('heading', { level: 2, name: /Encountered pokémons/i });

    expect(text).toBeInTheDocument();
  });
  it('Testa o botao de próximo', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    userEvent.click(getByText(/all/i));
    userEvent.click(getByText('Próximo pokémon'));
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent(data[1].name);
  });
  it('testa se ao clicar em um filtro ele exibe somente os daquele tipo', () => {
    const filteredData = data.filter((pokemon) => pokemon.type === 'Fire');
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const fireClass = getAllByTestId('pokemon-type-button')[1];

    userEvent.click(fireClass);
    userEvent.click(getByText('Próximo pokémon'));
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent(filteredData[1].name);
    expect(fireClass).toHaveTextContent('Fire');
  });
});
