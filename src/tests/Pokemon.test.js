import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests in Pokemon.js', () => {
  it('Cards render correctly', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const defaultSRC = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pkmName = screen.getByTestId('pokemon-name').innerHTML;
    const pkmType = screen.getByTestId('pokemon-type').innerHTML;
    const pkmWeight = screen.getByTestId('pokemon-weight').innerHTML;
    const pkmIMG = screen.getByRole('img', { name: `${pkmName} sprite` });
    expect(pkmName).toBe('Pikachu');
    expect(pkmType).toBe('Electric');
    expect(pkmWeight).toBe('Average weight: 6.0 kg');
    expect(pkmIMG).toBeInTheDocument();
    expect(pkmIMG).toHaveAttribute('src', defaultSRC);
    expect(pkmIMG).toHaveAttribute('alt', `${pkmName} sprite`); // gave me some help: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  });
  it('Card have a correctly navegation link', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pikachuID = '25';
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${pikachuID}`);
  });
});
