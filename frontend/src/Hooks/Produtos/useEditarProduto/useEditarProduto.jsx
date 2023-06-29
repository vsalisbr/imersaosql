import {useState} from 'react';
import EditarProdutoModal from './EditarProdutoModal';

function useEditarProduto(produtos_id) {
  const [showModal, setShowModal] = useState(false);

  return {
    EditarProdutoModal: () => EditarProdutoModal({ showModal, setShowModal, produtos_id }),
    setShowModal,
    showModal
  };
}

export default useEditarProduto;
