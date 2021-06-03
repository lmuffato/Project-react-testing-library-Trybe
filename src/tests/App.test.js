import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste padrão que veio com o projeto', () => {
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

// Relembrei a sintaxe de como utilizar o "describe" na documentação
// do Jest https://jestjs.io/pt-BR/docs/api#describename-fn

// Seletores: https://testing-library.com/docs/react-testing-library/cheatsheet
// Exemplos de uso: https://testing-library.com/docs/react-testing-library/example-intro/

// Sobre testar a página não encontrada eu consultei o conteúdo do dia 15.3 do course

describe('1. Teste o componente <App.js />', () => {
  it('Testa se a página principal é carregada através da URL /', () => {
    const { getByText } = renderWithRouter(<App />);
    const titulo = getByText(/Pokédex/i);
    expect(titulo).toBeInTheDocument();
  });
  it('Testa apenas se na parte superior existem os links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
  });
  it('Testa se o link de navegação "Home" funciona', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    userEvent.click(home);
    const titulo = getByText(/Encountered pokémons/i);
    expect(titulo).toBeInTheDocument();
  });
  it('Testa se o link de navegação "About" funciona', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText('About');
    userEvent.click(about);
    const titulo = getByText(/About Pokédex/i);
    expect(titulo).toBeInTheDocument();
  });
  it('Testa se informa "not found" se a URL não existe', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const erro404 = getByText(/Page requested not found/i);
    expect(erro404).toBeInTheDocument();
  });
});
