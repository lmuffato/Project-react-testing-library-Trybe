import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
    screen.getByText(/About Pokédex/i);
    const imageAlt = screen.getByAltText('Pokédex');
    expect(imageAlt.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
