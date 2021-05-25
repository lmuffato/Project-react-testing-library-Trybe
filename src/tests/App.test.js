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
    expect(getByRole('link', {
      name: links[0],
    })).toBeInTheDocument();
    expect(getByRole('link', {
      name: links[1],
    })).toBeInTheDocument();
    expect(getByRole('link', {
      name: links[2],
    })).toBeInTheDocument();
  });

  it(`Test if the application is redirected to specific
   pages when clicked on the page link`, () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const linkToHome = getByRole('link', {
      name: links[0],
    });
    const linkToAbout = getByRole('link', {
      name: links[1],
    });
    const linkToFavorite = getByRole('link', {
      name: links[2],
    });

    userEvent.click(linkToHome);
    let path = history.location.pathname;
    expect(path).toBe(paths[0]);
    expect(getByRole('heading', {
      name: headingPage[0],
    })).toBeInTheDocument(headingPage[0]);

    userEvent.click(linkToAbout);
    path = history.location.pathname;
    expect(path).toBe(paths[1]);
    expect(getByRole('heading', {
      name: headingPage[1],
    })).toBeInTheDocument(headingPage[1]);

    userEvent.click(linkToFavorite);
    path = history.location.pathname;
    expect(path).toBe(paths[2]);
    expect(getByRole('heading', {
      name: headingPage[2],
    })).toBeInTheDocument(headingPage[2]);
  });

  it('Tests if redirected to page not found when url is unknown', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const pathNotFound = history.location.pathname;
    expect(pathNotFound).toBe('/page-not-found');
    expect(getByRole('heading', {
      name: /page requested not found crying emoji/i,
    })).toBeInTheDocument();
  });
});
