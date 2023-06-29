import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import useDeletarVenda from '../Hooks/Vendas/useDeletarVenda/useDeletarVenda';
import formatarValorParaReal from '../utils/formatarValorParaReal';
import formatarData from '../utils/formatarData';
import { useNavigate } from 'react-router-dom';

function Vendas() {
  const navigate = useNavigate();
  const [vendas, setVendas] = useState([]);
  const [vendaSelecionada, setVendaSelecionada] = useState(null);

  const { DeletarVendaModal, setShowModal: setShowModalDeletar, showModal: showModalDeletar } = useDeletarVenda(vendaSelecionada);

  useEffect(() => {
    getVendas();
  }, []);

  useEffect(() => {
    if(!showModalDeletar) {
      setVendaSelecionada(null);
      getVendas();
    }
  }, [showModalDeletar]);

  const getVendas = () => {
    fetch('http://localhost:9090/vendas')
      .then(response => response.json())
      .then(data => setVendas(data));
  };
  
  return (
    <>
      <div className='page-title'>
        Vendas
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='table-check'>#</th>
            <th className='table-id'>ID</th>
            <th className='table-name'>Cliente</th>
            <th className='table-status'>Data</th>
            <th className='table-status'>Valor</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr 
              key={venda.VENDAS_ID}
              onClick={() => {
                if (vendaSelecionada === venda.VENDAS_ID) {
                  setVendaSelecionada(null);
                } else {
                  setVendaSelecionada(venda.VENDAS_ID);
                }
              }}
            >
              <td>
                <input
                  className='form-check-input'
                  type="checkbox"
                  checked={vendaSelecionada === venda.VENDAS_ID}
                  onChange={() => {
                    if (vendaSelecionada === venda.VENDAS_ID) {
                      setVendaSelecionada(null);
                    } else {
                      setVendaSelecionada(venda.VENDAS_ID);
                    }
                  }}
                />
              </td>
              <td>{venda.VENDAS_ID}</td>
              <td>{venda.CLIENTES_ID} - {venda.CLIENTE_NOME}</td>
              <td>{formatarData(venda.VENDA_DATA)}</td>
              <td>{formatarValorParaReal(venda.VENDA_VALOR)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='action-buttons'>
        <button 
          className='btn btn-warning'
          disabled={vendaSelecionada === null}
          onClick={() => navigate(`/vendas/${vendaSelecionada}`)}
        >
          Detalhar/Editar
        </button>
        <button 
          className='btn btn-danger'
          disabled={vendaSelecionada === null}     
          onClick={() => setShowModalDeletar(true)}
        >
          Excluir
        </button>
        <button 
          className='btn btn-success'
          onClick={() => navigate('/vendas/novavenda')}
        >
          Novo
        </button>
      </div>
      <DeletarVendaModal />
    </>
  );
}

export default Vendas;
