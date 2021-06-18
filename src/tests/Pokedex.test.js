import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../render/renderWithRouter';
import App from '../App';
import data from '../data';

const button = 'Próximo pokémon';
const types = data.map(({ type }) => type);
const buttonTypes = types.filter((type, index, array) => array.indexOf(type) === index);
const getType = (value) => data.filter(({ type }) => type === value);

describe('Test pokedex componet', () => {
  test('Test if has h2', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  test('Test button', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <App />,
    );

    data.forEach(({ name }) => {
      expect(getAllByText('More details').length).toBe(1);
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(button));
    });
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  test('Test by tybe', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-type-button').length).toBe(buttonTypes.length);
    buttonTypes.forEach((name) => {
      const btnType = getByRole('button', { name });
      fireEvent.click(btnType);
      getType(name).forEach(({ name: pokemon }) => {
        expect(getByText(pokemon)).toBeInTheDocument();
        fireEvent.click(getByText(button));
      });
    });

    const buttonAll = getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);
    data.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(button));
    });
  });
});
