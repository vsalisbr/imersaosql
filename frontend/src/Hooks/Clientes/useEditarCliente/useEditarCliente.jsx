import {useState} from 'react';
import EditarClienteModal from './EditarClienteModal';

function useEditarCliente(clientes_id) {
  const [showModal, setShowModal] = useState(false);

  return {
    EditarClienteModal: () => EditarClienteModal({ showModal, setShowModal, clientes_id }),
    setShowModal,
    showModal
  };
}

export default useEditarCliente;
