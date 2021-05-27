import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Test the <Pokemon /> component', () => {
  it('Test if a card is rendered with the information of a certain Pokémon.', () => {
    const { getByRole, getByText, getAllByText, debug } = renderWithRouter(<App />);

    expect(getByText(/pikachu/i)).toBeInTheDocument();

    expect(getAllByText(/electric/i)[0]).toBeInTheDocument();

    expect(getByText(/average weight: 6\.0 kg/i)).toBeInTheDocument();
  });
});
