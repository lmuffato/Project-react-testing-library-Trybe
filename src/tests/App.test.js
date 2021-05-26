import { getByText, getByTestId } from '@testing-library/dom';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('App tests', () => {
  it('renderiza um título chamado `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('mostra Pokédex quando a rota é `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('renderiza uma div com dados do pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pkmName = getByTestId('pokemon-name');
    const pkmType = getByTestId('pokemon-type');
    const pkmWeight = getByTestId('pokemon-weight');
    // const pkmImg = getByAltText(/sprite/i);
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemon-type')).toBeInTheDocument();
    expect(getByTestId('pokemon-weight')).toBeInTheDocument();



    //div geral
    //name
    //type
    //weight
    //moredetails link
    //sprite

  });



});

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>,
//   );
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

// test('shows the Pokédex when the route is `/`', () => {
//   const { getByText } = render(
//     <MemoryRouter initialEntries={['/']}>
//       <App />
//     </MemoryRouter>,
//   );

//   expect(getByText('Encountered pokémons')).toBeInTheDocument();
// });