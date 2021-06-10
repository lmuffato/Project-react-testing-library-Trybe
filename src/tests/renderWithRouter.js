import { render } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function renderWithRouter(componentToRender) {
  const historyMock = createMemoryHistory();

  const renderObject = render(
    <Router history={ historyMock }>
      {componentToRender}
    </Router>,
  );

  return {
    ...renderObject,
    history: historyMock,
  };
}

export default renderWithRouter;
