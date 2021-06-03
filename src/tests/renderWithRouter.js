import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(e) {
  const history = createMemoryHistory();
  const renderRoute = render(
    <Router history={ history }>{e}</Router>,
  );
  return {
    ...renderRoute,
    history,
  };
}

export default renderWithRouter;
