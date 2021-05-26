import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(component) {
  const history = createMemoryHistory();
  const result = render(
    <MemoryRouter history={ history }>
      {component}
    </MemoryRouter>,
  );
  return { ...result, history };
}