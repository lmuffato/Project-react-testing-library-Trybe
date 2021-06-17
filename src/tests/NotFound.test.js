import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('notFound component', () => {
  test('Contains heading h2 notFound', () => {
    const {
      getByRole,
      history,
    } = renderWithRouter(<App />);
    history.push('/hsahush');

    const heading2 = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(heading2).toBeInTheDocument();
  });

  test('Contains image link notFound', () => {
    const {
      getByAltText,
      history,
    } = renderWithRouter(<App />);
    history.push('/hsahush');

    const image = getByAltText('Pikachu crying because the page requested was not found');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toContain(url);
  });
});
