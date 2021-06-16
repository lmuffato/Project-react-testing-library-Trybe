import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(component) {
  const historyMock = createMemoryHistory();

  const renderObject = render(
      <Router history={ historyMock }>
      {component}
      </Router>,
  );

  return {
      ...renderObject,
      history: historyMock, // router aqui é history
  };
}
