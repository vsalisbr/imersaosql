import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../useInput/useInput';

function EditarClienteModal ({ showModal, setShowModal, clientes_id }) {
  const nome = useInput('');
  const {setValue} = nome;
  const [clienteAtivo, setClienteAtivo] = useState(false);

  useEffect(() => {
    if(showModal){
      const endPoint = `http://localhost:9090/clientes/byid/${clientes_id}`;
      fetch(endPoint)
        .then((res) => res.json())
        .then((data) => {
          const ativo = data.CLIENTE_ATIVO === -1;
          setValue(data.CLIENTE_NOME);
          setClienteAtivo(ativo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showModal, setValue, clientes_id]);

  const handleConfirm = () => {
    const { value: cliente_nome } = nome;
    const cliente_ativo = clienteAtivo ? -1 : 0;
    const endPoint = 'http://localhost:9090/clientes/editar';
    const body = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cliente_nome, cliente_ativo, clientes_id }),
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
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nome do Cliente</Form.Label>
          <Form.Control type="text" value={nome.value} onChange={nome.onChange} />
          <Form.Check 
            label="Cliente Ativo?"
            type="checkbox" 
            id="clienteAtivo" 
            name="clienteAtivo" 
            checked={clienteAtivo}
            onChange={() => setClienteAtivo(!clienteAtivo)} 
          />          
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

EditarClienteModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  clientes_id: PropTypes.number || null,
}.isRequired;

export default EditarClienteModal;
