import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import useCadastrarProduto from '../Hooks/Produtos/useCadastrarProduto/useCadastrarProduto';
import useEditarProduto from '../Hooks/Produtos/useEditarProduto/useEditarProduto';
import useDeletarProduto from '../Hooks/Produtos/useDeletarProduto/useDeletarProduto';
import formatarValorParaReal from '../utils/formatarValorParaReal';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const { CadastrarProdutoModal, setShowModal: setShowModalNovo, showModal: showModalNovo } = useCadastrarProduto();
  const { EditarProdutoModal, setShowModal: setShowModalEditar, showModal: showModalEditar } = useEditarProduto(produtoSelecionado);
  const { DeletarProdutoModal, setShowModal: setShowModalDeletar, showModal: showModalDeletar } = useDeletarProduto(produtoSelecionado);

  useEffect(() => {
    getProdutos();
  }, []);

  useEffect(() => {
    if(!showModalNovo && !showModalEditar && !showModalDeletar) {
      setProdutoSelecionado(null);
      getProdutos();
    }
  }, [showModalNovo, showModalEditar, showModalDeletar]);

  const getProdutos = () => {
    fetch('http://localhost:9090/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data));
  };
  
  return (
    <>
      <div className='page-title'>
        Produtos
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='table-check'>#</th>
            <th className='table-id'>ID</th>
            <th className='table-name'>Nome</th>
            <th className='table-status'>Preço de Custo</th>
            <th className='table-status'>Preço de Venda</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr 
              key={produto.PRODUTOS_ID}
              onClick={() => {
                if (produtoSelecionado === produto.PRODUTOS_ID) {
                  setProdutoSelecionado(null);
                } else {
                  setProdutoSelecionado(produto.PRODUTOS_ID);
                }
              }}
            >
              <td>
                <input
                  className='form-check-input'
                  type="checkbox"
                  checked={produtoSelecionado === produto.PRODUTOS_ID}
                  onChange={() => {
                    if (produtoSelecionado === produto.PRODUTOS_ID) {
                      setProdutoSelecionado(null);
                    } else {
                      setProdutoSelecionado(produto.PRODUTOS_ID);
                    }
                  }}
                />
              </td>
              <td>{produto.PRODUTOS_ID}</td>
              <td>{produto.PRODUTO_NOME}</td>
              <td>{formatarValorParaReal(produto.PRODUTO_PRECO_CUSTO)}</td>
              <td>{formatarValorParaReal(produto.PRODUTO_PRECO_VENDA)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='action-buttons'>
        <button 
          className='btn btn-warning'
          disabled={produtoSelecionado === null}
          onClick={() => setShowModalEditar(true)}
        >
          Editar
        </button>
        <button 
          className='btn btn-danger'
          disabled={produtoSelecionado === null}     
          onClick={() => setShowModalDeletar(true)}
        >
          Excluir
        </button>
        <button 
          className='btn btn-success'
          onClick={() => setShowModalNovo(true)}
        >
          Novo
        </button>
      </div>
      <CadastrarProdutoModal />
      <EditarProdutoModal />
      <DeletarProdutoModal />
    </>
  );
}

export default Produtos;
