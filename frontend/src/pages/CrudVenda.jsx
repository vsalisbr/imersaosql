import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CrudVenda.css';
import usePesquisarCliente from '../Hooks/Clientes/usePesquisarCliente/usePesquisarCliente';
import { Table, Button } from 'react-bootstrap';

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

  const [produto, setProduto] = useState({
    PRODUTOS_ID: '',
    PRODUTO_NOME: '',
    ITEM_VENDA_PRECO: '',
    ITEM_VENDA_QTD: '',
    PRODUTO_SENDO_EDITADO: false,
    PRODUTO_PARA_EDITAR_INDEX: null,
  });

  const handleChangeProduto = (event) => {
    const { name, value } = event.target;
    setProduto({ ...produto, [name]: value });
  };

  const mudarCliente = (cliente) => {
    setVenda({ ...venda, CLIENTES_ID: cliente.CLIENTES_ID, CLIENTE_NOME: cliente.CLIENTE_NOME });
    setShowModalPesquisarCliente(false);
  };

  const { PesquisarClienteModal, setShowModal: setShowModalPesquisarCliente } = usePesquisarCliente(mudarCliente);

  useEffect(() => {
    if(vendasId && vendasId !== 'novavenda') {
      fetch(`http://localhost:9090/vendas/${vendasId}`)
        .then(response => response.json())
        .then(data =>{
          setVenda(data);
        })
        .catch(() => navigate('/vendas') );
    }
  }, [vendasId, navigate]);

  const handleExcluirItem = (index) => {
    const updatedItens = [...venda.ITENS_VENDA];
    updatedItens.splice(index, 1);
    setVenda({ ...venda, ITENS_VENDA: updatedItens });
  };

  const handleIncluirItem = () => {
    if (produto.PRODUTO_SENDO_EDITADO) {
      const updatedItens = [...venda.ITENS_VENDA];
      updatedItens[produto.PRODUTO_PARA_EDITAR_INDEX] = produto;
      setVenda({ ...venda, ITENS_VENDA: updatedItens });
    } else {
      const updatedItens = [...venda.ITENS_VENDA, produto];
      setVenda({ ...venda, ITENS_VENDA: updatedItens });
    }
    handleFinalizarEditarItem();
  };

  const handleEditarItem = (index) => {
    setProduto({
      ...venda.ITENS_VENDA[index],
      PRODUTO_SENDO_EDITADO: true,
      PRODUTO_PARA_EDITAR_INDEX: index,
    });
  };

  const handleFinalizarEditarItem = () => {
    setProduto({
      PRODUTOS_ID: '',
      PRODUTO_NOME: '',
      ITEM_VENDA_PRECO: '',
      ITEM_VENDA_QTD: '',
      PRODUTO_SENDO_EDITADO: false,
      PRODUTO_PARA_EDITAR_INDEX: null,
    });
  };

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
              placeholder="ID"
              readOnly={true}
            />
          </div>
          <input
            className="form-control input-cliente-name"
            type="text"
            name="CLIENTE_NOME"
            value={venda.CLIENTE_NOME}
            placeholder="Nome"
            readOnly={true}
          />
          <button
            className="btn-ico"
            onClick={() => setShowModalPesquisarCliente(true)}
          >
            <i className="bi bi-search" />
          </button>
        </section>
      </fieldset>

      <fieldset className="select-produto">
        <legend>{produto.PRODUTO_SENDO_EDITADO ? 'Editar Produto' : 'Novo Produto'}</legend>
        <section className="section-search-produto">
          <div className='div-search-produto'>
            <div className='div-search-produto-id'>
              <input
                className="form-control input-cliente-id"
                type="text"
                autoFocus
                name="PRODUTOS_ID"
                value={produto.PRODUTOS_ID}
                placeholder="ID"
                readOnly={true}
              />
            </div>
            <input
              className="form-control input-cliente-name"
              type="text"
              name="PRODUTO_NOME"
              value={produto.PRODUTO_NOME}
              placeholder="Nome"
              readOnly={true}
            />
            <button
              className="btn-ico"
              onClick={() => setShowModalPesquisarCliente(true)}
            >
              <i className="bi bi-search" />
            </button>
          </div>
          <div className='produto-info'>
            <input
              className="form-control input-cliente-name"
              type="text"
              name="ITEM_VENDA_QTD"
              value={produto.ITEM_VENDA_QTD}
              onChange={handleChangeProduto}
              placeholder="Quantidade"
            />
            <input
              className="form-control input-cliente-name"
              type="text"
              name="ITEM_VENDA_PRECO"
              value={produto.ITEM_VENDA_PRECO}
              onChange={handleChangeProduto}
              placeholder="Preço"
            />
            {produto.PRODUTO_SENDO_EDITADO && (
              <Button variant="warning" className='btn-cancelar-edit' onClick={() => handleFinalizarEditarItem()}>
                Cancelar
              </Button>
            )}
            <Button variant="primary" onClick={() => handleIncluirItem()}>
              Salvar
            </Button>
          </div>
        </section>
      </fieldset>

      {venda.ITENS_VENDA?.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='table-id'>ID</th>
              <th>Nome do Produto</th>
              <th>QTD</th>
              <th>Preço</th>
              <th>Valor Total</th>
              <th className='table-status'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {venda.ITENS_VENDA.map((item, index) => (
              <tr key={index}>
                <td>{item.PRODUTOS_ID}</td>
                <td>{item.PRODUTO_NOME}</td>
                <td>{item.ITEM_VENDA_QTD}</td>
                <td>{item.ITEM_VENDA_PRECO}</td>
                <td>{item.ITEM_VENDA_QTD * item.ITEM_VENDA_PRECO}</td>
                <td className='table-status'>
                  <Button variant="warning" onClick={() => handleEditarItem(index)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleExcluirItem(index)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className='action-buttons'>
        <button 
          className='btn btn-warning'
          onClick={() => navigate('/vendas')}
        >
          Cancelar
        </button>
        <button 
          className='btn btn-success'
          onClick={() => console.log('Salvar')}
        >
          Salvar
        </button>
      </div>
      <PesquisarClienteModal />
    </>
  );
}

export default CrudVenda;
