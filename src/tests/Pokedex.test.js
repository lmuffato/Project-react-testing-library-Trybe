import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('renders a "home" page with the text "encountered pokémons"', () => {
  const { getByRole } = renderWithRouter(<App />);
  const home = getByRole('heading', { name: /encountered pokémons/i, level: 2 });
  expect(home).toBeInTheDocument();
});

it('should render the next pokemon when click on button "Próximo pokémon"', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const buttonNext = getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(buttonNext);
  const charmander = getByText('Charmander');

  expect(buttonNext).toBeInTheDocument();
  expect(charmander).toBeInTheDocument();
});
