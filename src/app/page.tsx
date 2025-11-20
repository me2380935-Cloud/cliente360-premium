"use client";

import React, { useState, useEffect } from "react";

export default function Page() {
  const [activeConfigPage, setActiveConfigPage] = useState(1);

  const [vigilanteData, setVigilanteData] = useState({
    nomeFantasia: "",
    segmentoMercado: "",
    servicoPrestado: "",
    nomeVigilante: "",
    contato: "",
    cpfCnpj: "",
    chavePix: "",
  });

  return (
    <div>
      {/* sua página aqui */}
    </div>
  );
}
