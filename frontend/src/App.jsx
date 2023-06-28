import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Clientes from './pages/Clientes';
import Produtos from './pages/Produtos';
import Vendas from './pages/Vendas';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={<Clientes />} 
          />
          <Route
            path="/produtos"
            element={<Produtos />}
          />
          <Route
            path="/vendas"
            element={<Vendas />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
