import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test \'Not Found\' page', () => {
  it('Test if \'Not Found\' page contains title', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/not-found');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  it('Test if \'Not Found\' page contains image', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/not-found');
    const notFoundImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
