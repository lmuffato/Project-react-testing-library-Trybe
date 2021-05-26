import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        { component }
      </Router>,
    ),
    history,
  });
};

describe('4. Teste o componente <NotFound.js />', () => {
  it('contém um heading h2 com o texto Page requested not found 😭;', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');

    const head = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });
    expect(head).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy...', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
