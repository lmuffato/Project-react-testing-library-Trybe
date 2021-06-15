import { render } from "react-dom";
import { About } from "../components";

describe('bloco de testes de about', () => {
  test('teste se a pagina About contem h2', () => {
    render(<About />)
  });
});
