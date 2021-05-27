import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Test the "About" component - Requirement 2', () => {
  it('check if the "About" component is being correctly rendered', () => {
    // Acessar os elementos da sua tela
    const { history } = renderWithRouter(<About />);
    const { pathname } = history.location;
    // Fazer seu teste
    expect(pathname).toBe('/');
  });

  it('check the component texts', () => {
    // Acessar os elementos da sua tela
    const { getByRole, getByText } = renderWithRouter(<About />);
    const subtitle = getByRole('heading', { level: 2 });
    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    const secondParagraph = getByText(/One can filter Pokémons by type/i);
    // Fazer seu teste
    expect(subtitle).toHaveTextContent('About Pokédex');
    expect(firstParagraph).toHaveTextContent('encyclopedia containing all Pokémons');
    expect(secondParagraph).toHaveTextContent('see more details for each one of them');
  });

  it('check if the right image is rendered', () => {
    // Acessar os elementos da sua tela
    const { getByAltText } = renderWithRouter(<About />);
    const imgElement = getByAltText('Pokédex');
    // Fazer seu teste
    expect(imgElement.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// Acessar os elementos da sua tela
// Interagir com eles (se houver necessidade)
// Fazer seu teste
