import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../useInput/useInput';

function EditarProdutoModal ({ showModal, setShowModal, produtos_id }) {
  const produtoNome = useInput('');
  const precoCusto = useInput('');
  const precoVenda = useInput('');

  const {setValue: setValueNome} = produtoNome;
  const {setValue: setValueCusto} = precoCusto;
  const {setValue: setValueVenda} = precoVenda;

  useEffect(() => {
    if(showModal){
      const endPoint = `http://localhost:9090/produtos/byid/${produtos_id}`;
      fetch(endPoint)
        .then((res) => res.json())
        .then((data) => {
          setValueNome(data.PRODUTO_NOME);
          setValueCusto(data.PRODUTO_PRECO_CUSTO);
          setValueVenda(data.PRODUTO_PRECO_VENDA);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showModal, produtos_id, setValueNome, setValueCusto, setValueVenda]);

  const handleConfirm = () => {
    const { value: produto_nome } = produtoNome;
    const { value: produto_preco_custo } = precoCusto;
    const { value: produto_preco_venda } = precoVenda;
    const endPoint = 'http://localhost:9090/produtos/editar';
    const body = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ produto_nome, produto_preco_custo, produto_preco_venda, produtos_id }),
    };
    fetch(endPoint, body)
      .then(() => {
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        setShowModal(false);
      });
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
      <Modal.Header>
        <Modal.Title>Editar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nome do Produto</Form.Label>
          <Form.Control type="text" value={produtoNome.value} onChange={produtoNome.onChange} />
          <Form.Label>Preço de Custo</Form.Label>
          <Form.Control type="text" value={precoCusto.value} onChange={precoCusto.onChange} />  
          <Form.Label>Preço de Venda</Form.Label>
          <Form.Control type="text" value={precoVenda.value} onChange={precoVenda.onChange} />  
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

EditarProdutoModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  clientes_id: PropTypes.number || null,
}.isRequired;

export default EditarProdutoModal;
