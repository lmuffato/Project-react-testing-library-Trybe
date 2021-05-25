import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('about', () => {
  it('render a about page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const AboutLink = getByText(/About/i);

    fireEvent.click(AboutLink);

    const AboutPageHeader = getByText(/About Pokédex/i);
    expect(AboutPageHeader).toBeInTheDocument();
  });
})
