import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('tests for the NotFound component', () => {
  it('Test if page contains a heading with the text Page requested not found', () => {
    render(<NotFound />);
    const heading = screen.getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  it('test if it contains an image', () => {
    render(<NotFound />);
    const image = screen.getAllByRole('img');
    const imageAdress = image[1].src;
    const adress = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imageAdress).toEqual(adress);
  });
});
