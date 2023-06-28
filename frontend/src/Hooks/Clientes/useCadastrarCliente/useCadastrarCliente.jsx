import {useState} from 'react';
import CadastrarClienteModal from './CadastrarClienteModal';

function useCadastrarCliente() {
  const [showModal, setShowModal] = useState(false);

  return {
    CadastrarClienteModal: () => CadastrarClienteModal({ showModal, setShowModal }),
    setShowModal,
    showModal
  };
}

export default useCadastrarCliente;
