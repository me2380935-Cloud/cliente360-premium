"use client";

import { useState } from "react";
import { Bell, ChevronDown, Search, DollarSign, Calendar, MapPin, User, FileText, BarChart3, Settings, ChevronRight, Camera, LogOut, Printer, Receipt, Map, FileDown, Sliders, ArrowLeft, Lock, CreditCard, Clock } from "lucide-react";

// Mock Data
const mockInvoices = [
  { id: 1, day: "01", name: "João Silva", number: "123", value: 150, status: "pending", neighborhood: "Centro", paymentMethod: "PIX" },
  { id: 2, day: "05", name: "Maria Santos", number: "456", value: 200, status: "paid", neighborhood: "Jardins", paymentMethod: "Dinheiro" },
  { id: 3, day: "10", name: "Pedro Costa", number: "789", value: 180, status: "pending", neighborhood: "Vila Nova", paymentMethod: "Cartão" },
  { id: 4, day: "15", name: "Ana Oliveira", number: "321", value: 150, status: "not_paid", neighborhood: "Centro", paymentMethod: "PIX" },
  { id: 5, day: "20", name: "Carlos Mendes", number: "654", value: 220, status: "paid", neighborhood: "Jardins", paymentMethod: "Dinheiro" },
  { id: 6, day: "25", name: "Lucia Ferreira", number: "987", value: 150, status: "pending", neighborhood: "Vila Nova", paymentMethod: "Cartão" },
];

const mockResidents = [
  { id: 1, name: "João Silva", number: "123", address: "Rua das Flores, 123", neighborhood: "Centro", value: 150 },
  { id: 2, name: "Maria Santos", number: "456", address: "Av. Paulista, 1000", neighborhood: "Jardins", value: 200 },
  { id: 3, name: "Pedro Costa", number: "789", address: "Rua Comercial, 456", neighborhood: "Vila Nova", value: 180 },
  { id: 4, name: "Ana Oliveira", number: "321", address: "Rua das Acácias, 789", neighborhood: "Centro", value: 150 },
  { id: 5, name: "Carlos Mendes", number: "654", address: "Av. Brasil, 2000", neighborhood: "Jardins", value: 220 },
];

// Mock User Data
const mockUserData = {
  name: "João Silva",
  email: "joao.silva@gmail.com",
  phone: "(11) 98765-4321",
  planExpiry: "15/02/2024",
  daysRemaining: 28,
  purchaseDate: "15/01/2024",
  planType: "30 dias",
  planPrice: "R$ 15,00",
  paymentStatus: "Pago"
};

export default function RondaNoturna() {
  const [activeTab, setActiveTab] = useState("faturas");
  const [activeSubTab, setActiveSubTab] = useState("faturas");
  const [activeConfigPage, setActiveConfigPage] = useState<string | null>(null);
  const [filterNeighborhood, setFilterNeighborhood] = useState("Todos");
  const [filterDay, setFilterDay] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const neighborhoods = ["Todos", "Centro", "Jardins", "Vila Nova"];
  const days = ["Todos", "01", "05", "10", "15", "20", "25"];

  const totalMonthly = mockInvoices.reduce((acc, inv) => acc + inv.value, 0);
  const toReceive = mockInvoices.filter(i => i.status === "pending").reduce((acc, inv) => acc + inv.value, 0);
  const received = mockInvoices.filter(i => i.status === "paid").reduce((acc, inv) => acc + inv.value, 0);
  const notReceived = mockInvoices.filter(i => i.status === "not_paid").reduce((acc, inv) => acc + inv.value, 0);

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchNeighborhood = filterNeighborhood === "Todos" || invoice.neighborhood === filterNeighborhood;
    const matchDay = filterDay === "Todos" || invoice.day === filterDay;
    const matchStatus = filterStatus === "all" || invoice.status === filterStatus;
    const matchPayment = filterPayment === "all" || invoice.paymentMethod === filterPayment;
    return matchNeighborhood && matchDay && matchStatus && matchPayment;
  });

  const filteredResidents = mockResidents.filter(resident => {
    const matchNeighborhood = filterNeighborhood === "Todos" || resident.neighborhood === filterNeighborhood;
    const matchSearch = resident.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       resident.number.includes(searchTerm);
    return matchNeighborhood && matchSearch;
  });

  const receivedPercentage = totalMonthly > 0 ? Math.round((received / totalMonthly) * 100) : 0;
  const toReceivePercentage = totalMonthly > 0 ? Math.round((toReceive / totalMonthly) * 100) : 0;
  const notReceivedPercentage = totalMonthly > 0 ? Math.round((notReceived / totalMonthly) * 100) : 0;

  // Render Minha Conta Page
  const renderMinhaContaPage = () => (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header with Back Button */}
      <div className="bg-black text-white px-4 py-4 flex items-center gap-3">
        <button onClick={() => setActiveConfigPage(null)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">Minha Conta</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white px-4 py-6 border-b border-gray-200">
        <div className="flex items-start gap-4">
          {/* Profile Picture */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <User className="w-10 h-10 text-gray-600" />
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#FFC107] rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* User Info & Plan Expiry */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-black">{mockUserData.name}</h3>
            <p className="text-sm text-gray-600">{mockUserData.email}</p>
            <div className="mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-orange-800">Vencimento do Plano</span>
                <span className="text-sm font-bold text-orange-900">{mockUserData.planExpiry}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-orange-700">{mockUserData.daysRemaining} dias restantes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-4 space-y-3">
        {/* Redefinir Senha */}
        <button className="w-full bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-medium text-black">Redefinir Senha</span>
        </button>

        {/* Comprar 30 Dias */}
        <button className="w-full bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white">Comprar +30 Dias</p>
              <p className="text-xs text-white/90">Renovação mensal</p>
            </div>
          </div>
          <span className="text-lg font-bold text-white">R$ 15,00</span>
        </button>

        {/* Comprar 6 Meses */}
        <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-white">Comprar +6 Meses</p>
              <p className="text-xs text-white/90">Economia de 20%</p>
            </div>
          </div>
          <span className="text-lg font-bold text-white">R$ 72,00</span>
        </button>
      </div>

      {/* Purchase History */}
      <div className="px-4 py-4">
        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Histórico de Compras</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700">{mockUserData.planType}</span>
              <span className="text-sm font-bold text-gray-900">{mockUserData.planPrice}</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data da Compra</span>
              <span className="text-sm font-medium text-gray-900">{mockUserData.purchaseDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Situação</span>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                mockUserData.paymentStatus === "Pago" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {mockUserData.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-black text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFC107] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-xl">R</span>
          </div>
          <h1 className="text-lg font-semibold">Ronda Noturna</h1>
        </div>
        <button className="relative">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {/* Show Config Sub-Pages */}
        {activeTab === "config" && activeConfigPage === "minha-conta" && renderMinhaContaPage()}

        {/* Faturas Tab */}
        {activeTab === "faturas" && (
          <div>
            {/* Sub Navigation */}
            <div className="bg-[#FFC107] px-4 py-3">
              <div className="flex gap-4 mb-3">
                <button
                  onClick={() => setActiveSubTab("faturas")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeSubTab === "faturas"
                      ? "bg-white text-black shadow-md"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  Faturas
                </button>
                <button
                  onClick={() => setActiveSubTab("criar")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeSubTab === "criar"
                      ? "bg-white text-black shadow-md"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  Criar Fatura
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <select
                    value={filterNeighborhood}
                    onChange={(e) => setFilterNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg appearance-none pr-8 text-sm font-medium text-black"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>{n === "Todos" ? "Bairro" : n}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-black" />
                </div>
                <div className="relative flex-1">
                  <select
                    value={filterDay}
                    onChange={(e) => setFilterDay(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg appearance-none pr-8 text-sm font-medium text-black"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>{d === "Todos" ? "Dia" : d}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-black" />
                </div>
                <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            {activeSubTab === "faturas" && (
              <>
                {/* Monthly Revenue */}
                <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
                  <span className="text-sm">Rendimento Mensal</span>
                  <span className="text-lg font-bold">R$ {totalMonthly.toFixed(2)}</span>
                </div>

                {/* Filter Buttons */}
                <div className="px-4 py-4 flex gap-2 overflow-x-auto">
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      filterStatus === "all"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Receber
                  </button>
                  <button
                    onClick={() => setFilterStatus("paid")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      filterStatus === "paid"
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Recebido
                  </button>
                  <button
                    onClick={() => setFilterStatus("not_paid")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      filterStatus === "not_paid"
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    Não Recebido
                  </button>
                  <button
                    onClick={() => setFilterPayment("PIX")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      filterPayment === "PIX"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    Pix
                  </button>
                  <button
                    onClick={() => setFilterPayment("Dinheiro")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      filterPayment === "Dinheiro"
                        ? "bg-yellow-600 text-white"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    Dinheiro
                  </button>
                  <button
                    onClick={() => setFilterPayment("Cartão")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      filterPayment === "Cartão"
                        ? "bg-orange-600 text-white"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    Cartão
                  </button>
                </div>

                {/* Invoice List */}
                <div className="px-4 space-y-3 pb-4">
                  {filteredInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-black">{invoice.day}</div>
                            <div className="text-xs text-gray-500">JAN</div>
                          </div>
                          <div>
                            <p className="font-semibold text-black">{invoice.name}</p>
                            <p className="text-sm text-gray-500">Nº {invoice.number}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-black">R$ {invoice.value.toFixed(2)}</p>
                        </div>
                      </div>
                      <button className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors">
                        Receber
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeSubTab === "criar" && (
              <div className="px-4 py-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-black mb-6">Nova Fatura</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Cliente</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                        placeholder="Digite o nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                        placeholder="Digite o número"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                        placeholder="0,00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dia de Vencimento</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]">
                        {days.filter(d => d !== "Todos").map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]">
                        {neighborhoods.filter(n => n !== "Todos").map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-black py-3 rounded-lg font-bold transition-colors"
                    >
                      Criar Fatura
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Moradores Tab */}
        {activeTab === "moradores" && (
          <div>
            {/* Header */}
            <div className="bg-[#FFC107] px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <button className="bg-white text-black px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow">
                  Novo Morador
                </button>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select
                    value={filterNeighborhood}
                    onChange={(e) => setFilterNeighborhood(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg appearance-none pr-8 text-sm font-medium text-black"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>{n === "Todos" ? "Bairro" : n}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-black" />
                </div>
                <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-4 bg-white border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar morador..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                />
              </div>
            </div>

            {/* Residents List */}
            <div className="px-4 py-4 space-y-3">
              {filteredResidents.map((resident) => (
                <div
                  key={resident.id}
                  className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-black text-lg">{resident.name}</p>
                      <p className="text-sm text-gray-500">Nº {resident.number}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-black">R$ {resident.value.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{resident.address}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {resident.neighborhood}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relatórios Tab */}
        {activeTab === "relatorios" && (
          <div>
            {/* Header */}
            <div className="bg-[#FFC107] px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-6 h-6 text-black" />
                <h2 className="text-lg font-bold text-black">RELATÓRIOS</h2>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select className="w-full px-3 py-2 bg-white rounded-lg appearance-none pr-8 text-sm font-medium text-black">
                    <option>Janeiro 2024</option>
                    <option>Dezembro 2023</option>
                    <option>Novembro 2023</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-black" />
                </div>
                <div className="relative flex-1">
                  <select className="w-full px-3 py-2 bg-white rounded-lg appearance-none pr-8 text-sm font-medium text-black">
                    <option>Filtro</option>
                    <option>Recebido</option>
                    <option>Pendente</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-black" />
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="px-4 py-8 bg-white">
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-64 h-64">
                  {/* Pie Chart SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {/* Recebido (Verde) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="20"
                      strokeDasharray={`${receivedPercentage * 2.51} 251`}
                      strokeDashoffset="0"
                    />
                    {/* A Receber (Cinza) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="20"
                      strokeDasharray={`${toReceivePercentage * 2.51} 251`}
                      strokeDashoffset={`-${receivedPercentage * 2.51}`}
                    />
                    {/* Não Recebido (Laranja) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="20"
                      strokeDasharray={`${notReceivedPercentage * 2.51} 251`}
                      strokeDashoffset={`-${(receivedPercentage + toReceivePercentage) * 2.51}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-black">{receivedPercentage}%</p>
                      <p className="text-sm text-gray-600">Recebido</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Total Mensal</span>
                  <span className="text-xl font-bold text-black">R$ {totalMonthly.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-gray-700">Receber</span>
                  </div>
                  <span className="font-bold text-gray-700">R$ {toReceive.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-700">Recebido</span>
                  </div>
                  <span className="font-bold text-green-600">R$ {received.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-gray-700">Não Recebido</span>
                  </div>
                  <span className="font-bold text-orange-600">R$ {notReceived.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Config Tab */}
        {activeTab === "config" && !activeConfigPage && (
          <div className="bg-gray-50 min-h-full">
            {/* Profile Header */}
            <div className="bg-white px-4 py-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <User className="w-10 h-10 text-gray-600" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-[#FFC107] rounded-full flex items-center justify-center shadow-md">
                    <Camera className="w-4 h-4 text-black" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black">João Silva</h3>
                  <p className="text-sm text-gray-600">joao.silva@gmail.com</p>
                  <p className="text-sm text-gray-600">(11) 98765-4321</p>
                </div>
              </div>
            </div>

            {/* Menu Options */}
            <div className="px-4 py-4 space-y-2">
              {/* Minha Conta */}
              <button 
                onClick={() => setActiveConfigPage("minha-conta")}
                className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-black">Minha Conta</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Dados do Vigilante */}
              <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium text-black">Dados do Vigilante</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Configurar Impressora */}
              <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Printer className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium text-black">Configurar Impressora</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Personalizar Recibos */}
              <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="font-medium text-black">Personalizar Recibos</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Configurar Bairros e Ruas */}
              <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Map className="w-5 h-5 text-cyan-600" />
                  </div>
                  <span className="font-medium text-black">Configurar Bairros e Ruas</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Gerar PDF de Moradores */}
              <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileDown className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-black">Gerar PDF de Moradores</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Preferências do App */}
              <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Sliders className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-medium text-black">Preferências do App</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              {/* Sair */}
              <button className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow border-2 border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-red-600">Sair</span>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black text-white border-t border-gray-800">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveTab("faturas")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "faturas" ? "text-[#FFC107]" : "text-gray-400"
            }`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs font-medium">Faturas</span>
          </button>
          <button
            onClick={() => setActiveTab("moradores")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "moradores" ? "text-[#FFC107]" : "text-gray-400"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Moradores</span>
          </button>
          <button
            onClick={() => setActiveTab("relatorios")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "relatorios" ? "text-[#FFC107]" : "text-gray-400"
            }`}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs font-medium">Relatórios</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("config");
              setActiveConfigPage(null);
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "config" ? "text-[#FFC107]" : "text-gray-400"
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs font-medium">Config</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
