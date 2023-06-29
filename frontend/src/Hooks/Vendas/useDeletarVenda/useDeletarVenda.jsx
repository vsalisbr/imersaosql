import {useState} from 'react';
import DeletarVendaModal from './DeletarVendaModal';

function useDeletarVenda(vendas_id) {
  const [showModal, setShowModal] = useState(false);

  return {
    DeletarVendaModal: () => DeletarVendaModal({ showModal, setShowModal, vendas_id }),
    setShowModal,
    showModal
  };
}

export default useDeletarVenda;
