import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import App from '../App';

/* it('', () => {}); */

describe('Testa componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    expect(getByTestId('pokemon-name').textContent).toBe(name);
    expect(getByTestId('pokemon-type').textContent).toBe(type);
    expect(getByTestId('pokemon-weight').textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    const img = getByAltText('Pikachu sprite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(image);
  });

  it('Testa se contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);

    const linkMoreDetails = getByRole('link', { name: /More details/i });
    expect(linkMoreDetails.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
  });

  it('Testa se clicar no link é feito o seu redirecionamento', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole, getByAltText } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);
    const checkbox = document.getElementById('favorite');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const img = getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('star-icon.svg');
    userEvent.click(checkbox);
    expect(img).not.toBeInTheDocument();
  });
});
