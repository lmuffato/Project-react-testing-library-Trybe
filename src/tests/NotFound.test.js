import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound />', () => {
  test('testa se com url desconhecida, acessa a pagina notFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', { level: 2, name: /requested not found/ });
    expect(title).toBeInTheDocument();
  });
});
