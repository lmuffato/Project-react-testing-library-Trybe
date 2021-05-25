import { screen } from '@testing-library/react';

function link(name) {
  return screen.getByRole('link', { name });
}

function checkIfIsRedirected({ from, to, event, history }) {
  history.push(from);

  event();
  expect(history.location.pathname).toBe(to);
}

function expectToBeInTheDocument(...elements) {
  elements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
}

export default {
  link,
  checkIfIsRedirected,
  expectToBeInTheDocument,
};
