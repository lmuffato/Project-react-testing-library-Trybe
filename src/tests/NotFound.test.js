import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('NotFound.js tests', () => {
  it('verify h2 text', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
    expect(notFound.tagName).toBe('H2');
  });
  it('verify image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const pikachuImage = getAllByRole('img');
    expect(pikachuImage[1]).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    // há duas role img (a primeira é no span do crying, por isso AllByRole e pegar o segundo elemento (que é o gif desejado)
    // referência: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  });
});
