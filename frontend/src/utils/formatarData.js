const formatarData = (data) => {
  const dataObj = new Date(data);
  const dia = dataObj.getDate();
  const mes = dataObj.getMonth() + 1;
  const ano = dataObj.getFullYear();

  const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;

  return dataFormatada;
};

export default formatarData;
