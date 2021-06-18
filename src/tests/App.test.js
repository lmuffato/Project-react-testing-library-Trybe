import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Exemplos de teste.', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Testes de redirecionamento.', () => {
  it('Testa se o app é redirecionado à página inicial ao clicar no link Home;', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/home/i));
  });

  it('Testa se o app é redirecionado à página about ao clicar no link about;', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/about/i));
  });

  it('Testa se o app é redirecionado à página Favorite Pokémons;', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
  });

  it('Testa se o app é redirecionado à página Not Found.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/inexistente/');
    const noFound = getByText(/Not Found/i);
    expect(noFound).toBeInTheDocument();
  });
});
