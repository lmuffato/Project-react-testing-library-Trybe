import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const renderObject = render (
    <Router history={ historyMock }>
      { component }
    </Router>,
  );
  
  return {
    ...renderObject,
    history: historyMock.action,
  };
}

export default renderWithRouter;