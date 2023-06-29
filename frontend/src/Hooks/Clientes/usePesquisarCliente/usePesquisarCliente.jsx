import { useState } from 'react';
import PesquisarClienteModal from './PesquisarClienteModal';

const usePesquisarCliente = (mudarCliente) => {
  const [showModal, setShowModal] = useState(false);

  return {
    PesquisarClienteModal: () => PesquisarClienteModal({ showModal, setShowModal, mudarCliente}),
    showModal,
    setShowModal,
  };
};

export default usePesquisarCliente;
