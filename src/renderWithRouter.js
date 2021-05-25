import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';


const renderWithRouter = (component) => {
  const historyMock = createMemoryHistory();
  const returnRender = render(<Router history={historyMock}>{component}</Router>)
  return ({
    ...returnRender,
    history: historyMock,
  })
}

export default renderWithRouter;