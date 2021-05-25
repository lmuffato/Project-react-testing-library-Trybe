import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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

// Referência: PR da aula do Instrutor Ícaro Harry
// https://github.com/tryber/sd-10a-live-lectures/blob/lecture/15.3/portfolio_example/src/tests/renderWithRouter.js
