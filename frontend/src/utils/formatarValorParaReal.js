const formatarValorParaReal = valor => `R$ ${parseFloat(valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;


export default formatarValorParaReal;
