import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Testa se a mensagem (No favorite pokemon found) aparece na tela ', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/favorites');

  const myText = getByText('No favorite pokemon found');

  expect(myText).toBeInTheDocument();
});
