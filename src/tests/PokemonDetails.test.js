import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('renders pokemon info', () => {
  it('renders headings', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const headingDetails = screen
      .getByRole('heading', { level: 2, name: /pikachu details/i });
    expect(headingDetails).toBeInTheDocument();
    const headingSummary = screen
      .getByRole('heading', { level: 2, name: /summary/i });
    expect(headingSummary).toBeInTheDocument();
  });

  it('it does not render the link for more details', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();
  });
});
