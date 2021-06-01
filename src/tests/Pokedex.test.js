import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2Test = getByRole('heading', {
      level: 2,
    });
    expect(h2Test).toHaveTextContent('Encountered pokémons');
  });
});
