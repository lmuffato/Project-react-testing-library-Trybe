import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

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

  it('render a about image', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const AboutLink = getByText(/About/i);
    fireEvent.click(AboutLink);

    const image = getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
