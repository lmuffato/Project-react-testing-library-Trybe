import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('page contains information about Pokédex', () => {
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

test('', () => {
  
})
