import {useState} from 'react';
import CadastrarProdutoModal from './CadastrarProdutoModal';

function useCadastrarProduto() {
  const [showModal, setShowModal] = useState(false);

  return {
    CadastrarClienteModal: () => CadastrarProdutoModal({ showModal, setShowModal }),
    setShowModal,
  };
}

export default useCadastrarProduto;
