import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
    const historyMock = createMemoryHistory();

    const renderObject = render(
        <Router history={ historyMock }>
            {component}
        </Router>
    );

    return {
        ...renderObject,
        history: historyMock,
    };
}

export default renderWithRouter;