import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const altImage = 'Pikachu crying because the page requested was not found';
const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('not found page', () => {
  it('render a not found page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/not-found');

    const heading = getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  it('render a image', () => {
    const { getByAltText, history } = renderWithRouter(<App />);

    history.push('/not-found');

    const image = getByAltText(altImage);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(srcImage);
  });
});
