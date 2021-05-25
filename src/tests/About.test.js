import React from 'react';
import App from '../App';
import renderWithRouter from '../components/helper';

test('A página principal é exibida pra a url "/"', () => {
  const { getByRole } = renderWithRouter(<App />);
});
