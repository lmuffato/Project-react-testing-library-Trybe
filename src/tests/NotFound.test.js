import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('tests the notFound component', () => {
  test('tests whether the heading is rendered with the correct text', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const headingTwo = getByRole('heading',
      { name: 'Page requested not found Crying emoji', level: 2 });
    expect(headingTwo).toBeInTheDocument();
  });
});
