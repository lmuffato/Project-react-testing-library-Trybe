import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const renderAppWithRouter = () => renderWithRouter(<App />);

describe('NotFound.test.js', () => {
  test('Exibe um h2 com o texto "Page requested not found"', () => {
    const { getByRole, history } = renderAppWithRouter();
    history.push('lets-test');
    const notFoundText = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2 });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Exibe uma imagem com um link pré definido', () => {
    const { getByAltText, history } = renderAppWithRouter();
    history.push('another-test');
    const altText = /Pikachu crying because the page requested was not found/i;
    const imageNotFound = getByAltText(altText);
    expect(imageNotFound).toBeInTheDocument();
  });
});
