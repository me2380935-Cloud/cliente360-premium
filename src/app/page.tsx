  "use client";
import { useState } from "react";

export default function Page() {
  const [activeConfigPage, setActiveConfigPage] = useState(1);

  const [vigilanteData, setVigilanteData] = useState({
    nomeFantasia: '',
    segmentoMercado: '',
    servicoPrestado: '',
    nomeVigilante: '',
    contato: '',
    cpfCnpj: '',
    chavePix: ''
  });

  return (
    <div>
      <h1>App funcionando</h1>
    </div>
  );
}