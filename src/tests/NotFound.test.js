import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { NotFound } from '../components';

describe('NotFound component tests', () => {
  it('renders NotFound component, with the text "Page requested not found" ', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    const notFoundtxt = getByText(/Page requested not found/i);
    expect(notFoundtxt).toBeInTheDocument();
  });
  it('renders NotFound component, with the text "Page requested not found" ', () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );
    const toBeImgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImg = getByAltText(/page requested was not found/i);
    expect(notFoundImg.src).toBe(toBeImgUrl);
  });
});
