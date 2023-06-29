import {useState} from 'react';
import CadastrarProdutoModal from './CadastrarProdutoModal';

function useCadastrarProduto() {
  const [showModal, setShowModal] = useState(false);

  return {
    CadastrarProdutoModal: () => CadastrarProdutoModal({ showModal, setShowModal }),
    setShowModal,
    showModal
  };
}

export default useCadastrarProduto;
