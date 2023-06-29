import { useState } from 'react';
import PesquisarProdutoModal from './PesquisarProdutoModal';

const usePesquisarProduto = (mudarProduto) => {
  const [showModal, setShowModal] = useState(false);

  return {
    PesquisarProdutoModal: () => PesquisarProdutoModal({ showModal, setShowModal, mudarProduto}),
    showModal,
    setShowModal,
  };
};

export default usePesquisarProduto;
