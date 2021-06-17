import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('App tests', () => {
  it('rendering in path "/" ', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const indentifyhome = getByText(/pokédex/i);
    expect(indentifyhome).toBeInTheDocument();
  });

  it('render links', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const FavoritePoke = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(FavoritePoke).toBeInTheDocument();
  });
  it('test if link Home change pathname', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const home = getByText(/Home/i);

    fireEvent.click(home);
    const homepathname = history.location.pathname;
    expect(homepathname).toBe('/');
  });
  it('test if link About change pathname', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const about = getByText(/About/i);

    fireEvent.click(about);
    const aboutpathname = history.location.pathname;
    expect(aboutpathname).toBe('/about');
  });
  it('test if link FavoritePoke change pathname', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const FavoritePoke = getByText(/Favorite Pokémons/i);

    fireEvent.click(FavoritePoke);
    const FavoritePokepathname = history.location.pathname;
    expect(FavoritePokepathname).toBe('/favorites');
  });
  it('test unknown pathname', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    // random url gen
    const Strings = 36;
    const SubStrings = 5;
    const RandomPath = Math.random()
      .toString(Strings)
      .replace(/[^a-z]+/g, '')
      .substr(0, SubStrings);
    history.push(`/${RandomPath}`);
    const notfound = getByText('Page requested not found');
    expect(notfound).toBeInTheDocument();
  });
});
