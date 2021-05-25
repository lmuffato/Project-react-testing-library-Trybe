const { render } = require("@testing-library/react");
import App from '../App'
import about from  '../components/About';

describe('about tests', () => {
  test('Teste se a página principal da Pokédex é renderizada ao carregar a aplicação no caminho de URL /.', () => {
    const { getByRole } = render(<About />);
  });
})

