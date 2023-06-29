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
          <div className='div-cliente-id'>
            <input
              className="form-control input-cliente-id"
              type="text"
              autoFocus
              name="CLIENTES_ID"
              value={venda.CLIENTES_ID}
              onChange={() => console.log('onChange')}
              placeholder="ID"
            />
          </div>
          <input
            className="form-control input-cliente-name"
            type="text"
            name="CLIENTE_NOME"
            value={venda.CLIENTE_NOME}
            onChange={() => console.log('onChange')}
            placeholder="Nome"
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
