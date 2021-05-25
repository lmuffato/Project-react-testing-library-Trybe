import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Test the component <App.js>', () => {
  const links = [/home/i, /about/i, /favorite pokémons/i];
  const headingPage = [/Encountered pokémons/i, /About Pokédex/i, /Favorite pokémons/i];
  const paths = ['/', '/about', '/favorites'];

  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders a reading with the text `Encountered pokémons`', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it(`Test if the top of the application contains the links home,
  about and Favorite Pokémons`, () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    links.forEach((link) => {
      expect(getByRole('link', {
        name: link,
      })).toBeInTheDocument();
    });
  });

  it('Test if the application is redirected to home page by clicking Home link', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    links.forEach((link, index) => {
      const linkTo = getByRole('link', {
        name: link,
      });
      userEvent.click(linkTo);
      const path = history.location.pathname;
      expect(path).toBe(paths[index]);
      expect(getByRole('heading', {
        name: headingPage[index],
      })).toBeInTheDocument(headingPage[index]);
    });

    history.push('/page-not-found');
    const pathNotFound = history.location.pathname;
    expect(pathNotFound).toBe('/page-not-found');
    expect(getByRole('heading', {
      name: /page requested not found crying emoji/i,
    })).toBeInTheDocument();
  });
});
