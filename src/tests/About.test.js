import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import App from '../App';
import About from '../components/About';

// Fonte: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
describe('Testing Component About', () => {
  it('Should have h2', () => {
    const { getByRole } = renderWithRouter(<About />);

    const h2 = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Should have two p', () => {
    const { getByText } = renderWithRouter(<About />);

    const p1 = getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(p1).toBeInTheDocument();
    const p2 = getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(p2).toBeInTheDocument();
  });
  it('Should have an img', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const image = getByAltText('Pokédex');

    expect(image.src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
