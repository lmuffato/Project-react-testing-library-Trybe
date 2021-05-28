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

  it('renders paragraphs with description of pokemon ', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const textPart1 = 'This intelligent Pokémon roasts hard berries with ';
    const textPart2 = 'electricity to make them tender enough to eat.';
    const textRegex = new RegExp(`${textPart1}${textPart2}`, 'i');
    screen.getByText(textRegex);
  });
});
