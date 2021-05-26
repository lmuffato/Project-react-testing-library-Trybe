// import React from 'react';
// import renderWithRouter from '../services/renderWithRouter';
// import Pokemon from '../components/Pokemon';
// import pokemons from '../data';

// describe('testing all screen application of the Pokémon', () => {
//   it('cheking render a pokémon with info', () => {
//     const { getByTestId, getByAltText } = renderWithRouter(<Pokemon />);
//     const name = getByTestId('pokemon-overview');
//     const type = getByTestId('pokemon-type');
//     const weight = getByTestId('pokemon-weight');
//     const img = getByAltText('is marked as favorite');
//     expect(name).toHaveTextContent(`${pokemons.name}`);
//     expect(type).toHaveTextContent(`${pokemons.type}`);
//     expect(weight).toHaveTextContent(
//       `Average weight: ${pokemons[0]
//         .averageWeight.value} ${pokemons[0]
//         .averageWeight.measurementUnit}`,
//     );
//     expect(img.src).toBe(pokemons[0]);
//   });
// });
