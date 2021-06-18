import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from '../render/renderWithRouter';
import App from '../App';
import data from '../data';

const textMoreDetails = /more details/i;

describe('Test compoent Details', () => {
  test('Test if has h2', () => {
    const { getByRole, getByText } = RenderWithRouter(<App />);
    const { name } = data[0];
    fireEvent.click(getByText(textMoreDetails));
    const heading = getByRole('heading', { level: 2, name: `${name} Details` });
    expect(heading).toBeInTheDocument();
    expect(getByRole('heading', { level: 2,
      name: `Game Locations of ${name}` })).toBeInTheDocument();
    expect(getByRole('heading', { level: 2, name: /summary/i })).toBeInTheDocument();
  });
  test('Test if has p', () => {
    const { queryByText } = RenderWithRouter(<App />);
    fireEvent.click(queryByText(textMoreDetails));
    const text = queryByText(
      (value, index) => index.tagName === 'P' && value.includes('Pokémon'),
    );
    expect(text).toBeInTheDocument();
  });
  test('No link', () => {
    const { queryByText } = RenderWithRouter(<App />);
    fireEvent.click(queryByText(textMoreDetails));
    expect(queryByText(textMoreDetails)).toBeNull();
  });
  test('Test localization map', () => {
    const { getAllByAltText, queryByText } = RenderWithRouter(<App />);
    fireEvent.click(queryByText(textMoreDetails));
    const { name, foundAt } = data[0];
    foundAt.forEach(({ location, map }, index) => {
      expect(queryByText(location));
      const img = getAllByAltText(`${name} location`)[index];
      expect(img).toHaveAttribute('src', map);
    });
  });
  test('Test favorited pokemon', () => {
    const {
      getByText,
      getByRole,
      queryByAltText,
      getByLabelText,
    } = RenderWithRouter(<App />);
    fireEvent.click(getByText(textMoreDetails));
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(queryByAltText(/marked/)).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(queryByAltText(/marked/)).toBeNull();
  });
});
