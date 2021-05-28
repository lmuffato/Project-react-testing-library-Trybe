import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('renders pokemon info', () => {
  it('render h2 with text Pikachu Details', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const heading = screen.getByRole('heading', { level: 2, name: /pikachu details/i });
    expect(heading).toBeInTheDocument();
  });
});
