import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests in NotFound.js', () => {
  it('Contain an tag h2 with the text: Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/isHereTheNotFoundPage');
    const requiredText = /Page requested not found Crying emoji/i;
    const heading = screen.getByRole('heading', { level: 2, name: requiredText });
    expect(heading).toBeInTheDocument();
  });
  it('Page contain the img: https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/isHereTheNotFoundPage');
    const requiredSRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const requiredImgAlt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByRole('img', { name: requiredImgAlt });
    expect(img.src).toBe(requiredSRC);
  });
});
