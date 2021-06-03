// Esse arquivo foi criado a partir do conteúdo da aula
// "Testando React Router" que faz parte do dia 15.3

import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
        ...render(<Router history={ history }>{ component }</Router>), history,
    });
};

export default renderWithRouter;
