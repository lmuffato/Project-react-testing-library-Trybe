import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const renderObject = render(
    <MemoryRouter history={ historyMock }>
      {component}
    </MemoryRouter>,
  );

  return {
    ...renderObject,
    history: historyMock,
  };
}

export default renderWithRouter;
