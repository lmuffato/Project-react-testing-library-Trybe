import { screen } from '@testing-library/react';

function link(name) {
  return screen.getByRole('link', { name });
}

function checkIfIsRedirected({ from, to, event, history }) {
  history.push(from);

  event();
  expect(history.location.pathname).toBe(to);
}

export default { link, checkIfIsRedirected };
