import { fireEvent } from '@testing-library/dom';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

it('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Teste o componente <App.js />', () => {
  it('Testa se o primeiro link possui o texto Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();

    fireEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se o segundo link possui o texto About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();

    fireEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });
});
