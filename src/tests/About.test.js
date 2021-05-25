import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('test mutations for about page', () => {
  test('renders a reading with the text `About Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const headingTwo = getByText(/About Pokédex/i);
    expect(headingTwo).toBeInTheDocument();
  });
});
