  "use client"
import React, { useState, useEffect } from "react";
// outros imports...
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