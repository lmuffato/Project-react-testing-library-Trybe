import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const renderObject = render(
    <Router history={ historyMock }>
      {component}
    </Router>,
  );

  return {
    ...renderObject,
    history: historyMock,
  };
}

export default renderWithRouter;
