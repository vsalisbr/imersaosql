import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useInput from '../../useInput/useInput';

function DeletarClienteModal ({ showModal, setShowModal, clientes_id }) {
  const nome = useInput('');
  const {setValue} = nome;

  useEffect(() => {
    if(showModal){
      const endPoint = `http://localhost:9090/clientes/byid/${clientes_id}`;
      fetch(endPoint)
        .then((res) => res.json())
        .then((data) => {
          setValue(data.CLIENTE_NOME);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showModal, setValue, clientes_id]);



  const handleConfirm = () => {
    const endPoint = `http://localhost:9090/clientes/deletar/${clientes_id}`;
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
        <Modal.Title>Deletar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Confirma deletar o cliente:</p>
        <p>{clientes_id} - {nome.value}</p>
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

DeletarClienteModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  clientes_id: PropTypes.number || null,
}.isRequired;

export default DeletarClienteModal;
