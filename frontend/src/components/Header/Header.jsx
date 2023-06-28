import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <div className='header-titulo'>
        Imersão SQL
      </div>
      <div className='header-menu'>
        <Link to="/">Clientes</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/vendas">Vendas</Link>
      </div>
    </header>
  );
}

export default Header;
