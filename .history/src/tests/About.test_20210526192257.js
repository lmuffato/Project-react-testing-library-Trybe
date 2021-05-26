import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../components/MemoryRouter';

describe('Renders about', () => {
  test('Tests if exits an H2 with the text: About Pokédex ', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2Finder = getByRole('heading', { level: 2 });
    expect(h2Finder).toHaveTextContent('About Pokédex');
  });

  test('Tests if exists two p`s in the component ', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const pFinder = getAllByText(/Pokémons/i);
    expect(pFinder[0]).toBeInTheDocument();
    expect(pFinder[1]).toBeInTheDocument();
  });

  test('', () => {});
  test('', () => {});
})