import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useInput from '../../useInput/useInput';

function DeletarProdutoModal ({ showModal, setShowModal, produtos_id }) {
  const produtoNome = useInput('');
  const {setValue} = produtoNome;

  useEffect(() => {
    if(showModal){
      const endPoint = `http://localhost:9090/produtos/byid/${produtos_id}`;
      fetch(endPoint)
        .then((res) => res.json())
        .then((data) => {
          setValue(data.PRODUTO_NOME);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showModal, setValue, produtos_id]);



  const handleConfirm = () => {
    const endPoint = `http://localhost:9090/produtos/deletar/${produtos_id}`;
    fetch(endPoint, {method: 'DELETE'})
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
        <Modal.Title>Deletar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Confirma deletar o produto:</p>
        <p>{produtos_id} - {produtoNome.value}</p>
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

DeletarProdutoModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  clientes_id: PropTypes.number || null,
}.isRequired;

export default DeletarProdutoModal;
