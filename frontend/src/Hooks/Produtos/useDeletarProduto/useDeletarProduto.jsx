import {useState} from 'react';
import DeletarProdutoModal from './DeletarProdutoModal';

function useDeletarProduto(produtos_id) {
  const [showModal, setShowModal] = useState(false);

  return {
    DeletarProdutoModal: () => DeletarProdutoModal({ showModal, setShowModal, produtos_id }),
    setShowModal,
    showModal
  };
}

export default useDeletarProduto;
