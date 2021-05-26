import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};
// exporto uma função que retorna todo o render + um history "mockado" que fizemos, para assim conseguirmos fazer o teste "mudar a página"
export default renderWithRouter;
