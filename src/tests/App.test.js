import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Testa se o topo da aplicação contém um conjunto fixo de links', () => {
  it('Testa se o primeiro link possui o texto Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });
  it('Testa se o segundo link possui o texto About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const aboutLink = getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
  });
  it('Testa se o terceiro link possui o texto Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favLink = getByText(/Favorite Pokémons/i);
    expect(favLink).toBeInTheDocument();
  });
});
