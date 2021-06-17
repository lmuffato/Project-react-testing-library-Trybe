import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { About } from '../components';

describe('/About tests', () => {
  it('renders a /about component, with the text `About Pokédex` ', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const AboutPokedex = getByText(/About Pokédex/i);
    expect(AboutPokedex).toBeInTheDocument();
  });
  it('renders two <p> with poke info ', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const AboutPokedex = container.getElementsByTagName('p');
    expect(AboutPokedex.length).toBe(2);
  });
  it('Correct image in /About', () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const imgsrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const RightImg = getByAltText('Pokédex');
    expect(RightImg.src).toBe(imgsrc);
  });
});
