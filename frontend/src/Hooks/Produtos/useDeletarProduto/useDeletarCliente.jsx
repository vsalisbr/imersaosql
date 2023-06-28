import {useState} from 'react';
import DeletarClienteModal from './DeletarClienteModal';

function useDeletarCliente(clientes_id) {
  const [showModal, setShowModal] = useState(false);

  return {
    DeletarClienteModal: () => DeletarClienteModal({ showModal, setShowModal, clientes_id }),
    setShowModal,
    showModal
  };
}

export default useDeletarCliente;
