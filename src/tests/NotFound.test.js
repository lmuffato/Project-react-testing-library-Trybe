import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing the component NotFound', () => {
  test('renders text: Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/randomURL');

    const pageText = screen.getByText(/page requested not found/i);

    expect(pageText).toBeInTheDocument();
  });

  test('renders img: https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/randomURL');

    const renderedImg = screen.getByAltText(
      /pikachu crying because the page requested was not found/i,
    );
    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(renderedImg.src).toBe(srcImg);
  });
});
