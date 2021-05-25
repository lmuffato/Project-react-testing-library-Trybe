import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('page contains information about Pokédex, and '
 + 'contains 2 paragraphs about Pokédex', () => {
  const { history } = renderWithRouter(<About />);

  history.push('/about');

  const paragraphs = screen.getAllByText(
    (content, element) => element.tagName.toLowerCase() === 'p'
    && content.includes('Pokémons'),
  );
  expect(paragraphs).toHaveLength(2);
});

test('page contains a h2 heading with text `About Pokédex`', () => {
  const { getByRole } = renderWithRouter(<About />);
  const aboutPage = getByRole('heading', {
    name: 'About Pokédex',
    level: 2,
  });
  expect(aboutPage).toBeInTheDocument();
});

test('page contains image of a Pokédex', () => {
  const { history } = renderWithRouter(<About />);
  history.push('/about');
  const imagePath = screen.getByAltText('Pokédex');
  expect(imagePath.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
