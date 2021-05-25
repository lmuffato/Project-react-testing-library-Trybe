import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('should have a Summary" `', () => {
  const { getByRole } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  const summary = getByRole('heading', { name: /summary/i, level: 2 });
  expect(summary).toBeInTheDocument();
});

it('should br possible to favorite a Pokemon `', () => {
  const { getByRole, getAllByRole } = renderWithRouter(<App />);
  const moreDetails = getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);
  const favChecked = getByRole('checkbox', { id: 'favorite' });
  expect(favChecked).toBeInTheDocument();
  userEvent.click(favChecked);
  const pokemonImg = getAllByRole('img');
  expect(pokemonImg[1]).toHaveAttribute('src', '/star-icon.svg');
  expect(pokemonImg[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
