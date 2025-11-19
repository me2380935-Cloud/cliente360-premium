'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, CreditCard, Key } from 'lucide-react';

interface VigilanteData {
  nomeVigilante: string;
  cpf: string;
  chavePix: string;
  imagemPadrao: string;
  imagemImpressao: string;
}

interface DadosVigilanteProps {
  onBack: () => void;
  onSave: (data: VigilanteData) => void;
  initialData?: Partial<VigilanteData>;
}

const DadosVigilante: React.FC<DadosVigilanteProps> = ({ onBack, onSave, initialData }) => {
  const [formData, setFormData] = useState<VigilanteData>({
    nomeVigilante: initialData?.nomeVigilante || '',
    cpf: initialData?.cpf || '',
    chavePix: initialData?.chavePix || '',
    imagemPadrao: initialData?.imagemPadrao || 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/63fe67d6-f319-4261-b0a4-d1e63e74e43f.jpg',
    imagemImpressao: initialData?.imagemImpressao || 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/d18ca648-cd0f-4816-870f-b9e9f02168cd.jpg',
  });

  const handleChange = (field: keyof VigilanteData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-semibold">Dados do Vigilante</h1>
      </div>

      {/* Dados do Serviço */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Dados do Serviço</h2>
        
        {/* Nome do Vigilante */}
        <div className="flex items-center border-b border-gray-300 py-2 mb-4">
          <User size={20} className="mr-3 text-gray-500" />
          <input
            type="text"
            placeholder="Nome do Vigilante"
            value={formData.nomeVigilante}
            onChange={(e) => handleChange('nomeVigilante', e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-700"
          />
        </div>

        {/* CPF */}
        <div className="flex items-center border-b border-gray-300 py-2 mb-4">
          <CreditCard size={20} className="mr-3 text-gray-500" />
          <input
            type="text"
            placeholder="CPF"
            value={formData.cpf}
            onChange={(e) => handleChange('cpf', e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-700"
          />
        </div>

        {/* Chave PIX */}
        <div className="flex items-center border-b border-gray-300 py-2 mb-4">
          <Key size={20} className="mr-3 text-gray-500" />
          <input
            type="text"
            placeholder="Chave PIX"
            value={formData.chavePix}
            onChange={(e) => handleChange('chavePix', e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Dados Pessoais - Imagens */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Dados Pessoais</h2>
        
        {/* Imagem Padrão */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-base font-medium mb-2">Imagem Padrão</h3>
          <div className="flex justify-center">
            <img
              src={formData.imagemPadrao}
              alt="Imagem Padrão"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Imagem Impressão */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-base font-medium mb-2">Imagem Impressão</h3>
          <div className="flex justify-center">
            <img
              src={formData.imagemImpressao}
              alt="Imagem Impressão"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Botão Salvar */}
      <button
        onClick={handleSave}
        className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold text-lg"
      >
        SALVAR
      </button>
    </div>
  );
};

export default DadosVigilante;