import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import formatarData from '../../../utils/formatarData';
import formatarValorParaReal from '../../../utils/formatarValorParaReal';

function DeletarVendaModal ({ showModal, setShowModal, vendas_id }) {
  const [venda, setVenda] = useState(null);
  useEffect(() => {
    if(showModal){
      const endPoint = `http://localhost:9090/vendas/byid/${vendas_id}`;
      fetch(endPoint)
        .then((res) => res.json())
        .then((data) => {
          setVenda(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showModal, vendas_id]);

  const handleConfirm = () => {
    const endPoint = `http://localhost:9090/vendas/deletar/${vendas_id}`;
    fetch(endPoint, {method: 'DELETE'})
      .then(() => {
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        setShowModal(false);
      });
  };

  if(!venda) return null;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
      <Modal.Header>
        <Modal.Title>Deletar Venda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Confirma deletar a venda:</p>
        <p>ID: {venda.VENDAS_ID} Data: {formatarData(venda.VENDA_DATA)} Valor: {formatarValorParaReal(venda.VENDA_VALOR)}</p>
        <p>Cliente: {venda.CLIENTES_ID} - {venda.CLIENTE_NOME}</p>
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

DeletarVendaModal.propTypes = {
  setShowModal: PropTypes.func,
  showModal: PropTypes.bool,
  clientes_id: PropTypes.number || null,
}.isRequired;

export default DeletarVendaModal;
