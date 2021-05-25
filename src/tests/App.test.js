import React from 'react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';

import App from '../App';
import { appData } from '../services/dataTest';

describe('Requirement 1 - renders the App', () => {
  const { links } = appData;

  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders the right path when user click in the link', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    links.forEach(({ linkName, linkPath }) => {
      const getLink = getByRole('link', { name: linkName });
      expect(getLink).toBeInTheDocument();

      userEvent.click(getLink);
      const { pathname } = history.location;
      expect(pathname).toBe(linkPath);
    });
  });

  it('render the right component when it gets an inexistent path', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/not-found-page');

    const headingNotFound = getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(headingNotFound).toBeInTheDocument();

    const gifNotFound = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(gifNotFound).toBeInTheDocument();
  });
});
