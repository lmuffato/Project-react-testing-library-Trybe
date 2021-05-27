import React from 'react';
import { MemoryRouter as BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

const renderAboutWithRouter = () => renderWithRouter(<About />);

describe('About.test.js', () => {
  test('Verifica se há informações sobre a pokedex', () => {
    const { getByRole, getByText } = renderAboutWithRouter();
    const AboutTitle = getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(AboutTitle).toBeInTheDocument();
    const paragraphers = getByText(/Pokémons/i);
    console.log(paragraphers);
  });
});
