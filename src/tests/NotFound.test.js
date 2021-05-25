import React from 'react';
import renderWithRouter from '../components/helper';
import App from '../App';

it('Testa a pagina notFound', () => {
  const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const altText = 'Pikachu crying because the page requested was not found';
  const { history, getByRole, getByAltText } = renderWithRouter(<App />);
  history.push('/nada');
  const subtitle = getByRole('heading', { level: 2, name: /Page requested not found/i });
  const image = getByAltText(altText);
  console.log(image);

  expect(subtitle).toBeInTheDocument();
  expect(image.src).toBe(imgSrc);
});
