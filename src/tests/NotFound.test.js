import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('not found page', () => {
  it('render a not found page', () => {
    const { getByText, history } = renderWithRouter(<App />)

    history.push('/not-found');

    const heading = getByText(/Page requested not found/g);
    expect(heading).toBeInTheDocument();
  })
})