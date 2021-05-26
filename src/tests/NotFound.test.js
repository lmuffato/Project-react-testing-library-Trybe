import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('renders the not found page', () => {
  it(`verify if the page contains a heading "h2" with the text
  "Page requested not found"`, () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const heading = getByText(/Page requested not found/i);

    expect(heading).toBeInTheDocument();
  });

  it(`verify if shows the image:
  "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"`, () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const img = getAllByRole('img');
    const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img[1].src).toBe(source);
    expect(img[1]).toBeInTheDocument();
  });
});
