import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('test mutations for about page', () => {
  test('renders a reading with the text `About Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const headingTwo = getByText(/About Pokédex/i);
    expect(headingTwo).toBeInTheDocument();
  });
  test('renders paragraphs with the correct text', () => {
    const paragraphOne = 'This application simulates a Pokédex, '
        + 'a digital encyclopedia containing all Pokémons';
    const paragraphTwo = 'One can filter Pokémons by type, '
        + 'and see more details for each one of them';

    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const pOne = getByText(paragraphOne);
    const pTwo = getByText(paragraphTwo);

    expect(pOne).toBeInTheDocument();
    expect(pTwo).toBeInTheDocument();
  });
});
