import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from 'react-dom';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';
import { About } from '../components';

describe('renders infos about the pokedex', () => {
  const { container, getByText, getByRole, getByAltText } = renderWithRouter(<App />);
  userEvent.click(getByText('About'));

  test('checks if h2 is rendered correctly', () => {
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('About Pokédex');

    const img = getByAltText('Pokédex');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach((parag) => expect(parag).toBeInTheDocument());
  });

/*   test('checks if the image is rendered correctly', () => {
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toBeInTheDocument();
  }); */
});
