import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons, NotFound } from '../components';
import pokemons from '../data';

test('', () => {
  render(<NotFound />);
  const notFoundTextEl = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i
  });
  
  const notFoundImageEl = screen.getAllByRole('img');
  const correctImagePath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(notFoundTextEl).toBeInTheDocument();
  expect(notFoundImageEl[1].src).toEqual(correctImagePath);

});
