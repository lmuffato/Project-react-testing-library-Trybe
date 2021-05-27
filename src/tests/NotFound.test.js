import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';
import App from '../App';

describe('Requiriment 04 - Testing a NotFound', () => {
  it('should should contain a heading h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Page requested not found 😭');
  });
  it('should show an image', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const image = getByAltText(/Pikachu crying because/);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
