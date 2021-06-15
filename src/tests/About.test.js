import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('About.js tests', () => {
  it('renders "About" page', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  it('verify h2 text', () => {
    const { getByRole } = renderWithRouter(<About />);
    const titleContent = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(titleContent).toBeInTheDocument();
  });

  it('verify paragraphs', () => {
    const { container } = renderWithRouter(<About />);
    // referência: https://stackoverflow.com/questions/54234515/get-by-html-element-with-react-testing-library
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
  });

  it('verify image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // referência: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  });
});
