import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CrudVenda.css';

function CrudVenda() {
  const { vendasId } = useParams();
  const navigate = useNavigate();
  const [venda, setVenda] = useState({
    VENDAS_ID: '',
    CLIENTES_ID: '',
    CLIENTE_NOME: '',
    VENDA_DATA: '',
    VENDA_VALOR: '',
    ITENS_VENDA: []
  });

  useEffect(() => {
    if(vendasId && vendasId !== 'novavenda') {
      fetch(`http://localhost:9090/vendas/${vendasId}`)
        .then(response => response.json())
        .then(data =>{
          console.log(data);
          setVenda(data);
        })
        .catch(() => navigate('/vendas') );
    }
  }, [vendasId, navigate]);

  return (
    <>
      <div className='page-title'>
        {vendasId !== 'novavenda' ? `Exibindo Venda ID ${vendasId}` : 'Nova Venda'}
      </div>     



      <fieldset className="select-cliente">
        <legend>Cliente</legend>
        <section className="section-search-cliente">
          <input
            type="text"
            autoFocus
            name="CLIENTES_ID"
            className="form-control input-cliente-id"
            placeholder="ID"
          />
          <input
            type="text"
            name="CLIENTE_NOME"
            className="form-control input-cliente-name"
            placeholder="Descrição"
          />
          <button
            className="btn-ico"
          >
            <i className="bi bi-search" />
          </button>
        </section>
      </fieldset>



      <div className='action-buttons'>
        <button 
          className='btn btn-warning'
          onClick={() => navigate('/vendas')}
        >
          Cancelar
        </button>
        <button 
          className='btn btn-danger'
          onClick={() => console.log('Cancelar')}
          disabled={vendasId === 'novavenda'}
        >
          Editar
        </button>
        <button 
          className='btn btn-success'
          onClick={() => console.log('Salvar')}
        >
          Salvar
        </button>
      </div>
    </>
  );
}

export default CrudVenda;
