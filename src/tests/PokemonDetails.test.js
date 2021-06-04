import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('The requirement 7 tests', () => {
  it('All informations about the Pokemon selected is on screen', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
  });

  it('There are maps on screen indicating the Pokemon localization', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
  });

  it('The user can selecting the Pokemon like favorite', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
  });
});
