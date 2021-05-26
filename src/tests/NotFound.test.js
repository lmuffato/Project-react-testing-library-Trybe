import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('test <NotFound />', () => {
  it('test that page has the appropriate text, emoticon and gif', () => {
    const { getByRole, getByAltText } = renderWithRouter(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const phraseInNotfound = getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(phraseInNotfound).toBeInTheDocument(); // verifica a frase

    const emoticonInNotFound = getByRole('img', {
      name: 'Crying emoji',
    });
    expect(emoticonInNotFound).toBeInTheDocument(); // verifica emoticon

    // verifica gif e src do gif.
    const gifSrc = getByAltText('Pikachu crying because'
    + ' the page requested was not found').src;
    expect(gifSrc).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
