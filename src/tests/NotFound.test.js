import React from 'react';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';

describe('testing NotFound component', () => {
  test('contain a heading h2 with the text "Page requested not found 😭"', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/anything');

    expect(history.location.pathname).toBe('/anything');

    const heading2 = getByRole('heading', { level: 2 });
    expect(heading2).toBeInTheDocument();
    expect(heading2.textContent).toBe('Page requested not found 😭');
  });

  test('shows correct image"', () => {
    const { getByAltText, history } = renderWithRouter(<App />);

    history.push('/anything');

    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
