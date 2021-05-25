import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto'
+ 'fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home e testa se'
  + 'a aplicacao é direcionada para / se clicar em Home', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const home = getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About e testa se a aplicação'
  + 'é redirecionada para a página de About, na URL /about, ao clicar no'
  + 'link About da barra de navegação.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const about = getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons e testa se a'
  + 'aplicação é redirecionada para a página de Pokémons Favoritados, na URL'
  + '/favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const favorites = getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });
});
