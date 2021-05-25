import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Testa si aparece o pokemon corretamente', () => {
  const { getByTestId, getByAltText, getByRole } = renderWithRouter(<App />);

  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemon-type');
  const weight = getByTestId('pokemon-weight');
  const img = getByAltText('Pikachu sprite');
  const linkDetails = getByRole('link', {
    name: /More details/i,
  });

  expect(name).toHaveTextContent('Pikachu');
  expect(type).toHaveTextContent('Electric');
  expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  expect(linkDetails).toBeInTheDocument();
  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});
