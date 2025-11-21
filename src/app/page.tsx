import { useState } from 'react';

const [activeConfigPage, setActiveConfigPage] = useState(null);
const [vigilanteData, setVigilanteData] = useState({
  nomeFantasia: '',
  segmentoMercado: '',
  servicoPrestado: '',
  nomeVigilante: '',
  contato: '',
  cpfCnpj: '',
  chavePix: ''
});