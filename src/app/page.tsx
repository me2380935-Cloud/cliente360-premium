"use client";
import { useEffect, useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, MinusCircle } from "lucide-react";

export default function ResultadoPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento real (~2.5s)
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // CORES E ÍCONES POR RECOMENDAÇÃO
  const getRecommendationStyle = (rec: string) => {
    switch (rec) {
      case "BUY":
        return {
          label: "COMPRA",
          color: "#00FF6A",
          icon: <ArrowUpCircle size={60} color="#00FF6A" />,
        };
      case "SELL":
        return {
          label: "VENDA",
          color: "#FF3B3B",
          icon: <ArrowDownCircle size={60} color="#FF3B3B" />,
        };
      default:
        return {
          label: "MANTER",
          color: "#FFD93B",
          icon: <MinusCircle size={60} color="#FFD93B" />,
        };
    }
  };

  // SIMULAÇÃO DE RESULTADO (DEPOIS TROCAMOS PELOS DADOS REAIS)
  const result = {
    recommendation: "BUY",
    confidence: 87,
    trend: "Alta moderada",
    support: "R$ 5.720",
    resistance: "R$ 5.940",
    summary:
      "O gráfico indica tendência de alta com força crescente. Indicadores apontam bom momento para entrada, com suporte sólido e rompimento recente de resistência.",
  };

  const style = getRecommendationStyle(result.recommendation);

  return (
    <main
      className="min-h-screen flex flex-col items-center p-6"
      style={{
        background: "linear-gradient(180deg, #0C001A 0%, #1A0033 100%)",
        color: "white",
      }}
    >
      {/* TÍTULO */}
      <h1
        className="text-3xl font-bold mb-4"
        style={{
          background: "linear-gradient(90deg, #C17CFF, #9B4DFF)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Resultado da Análise
      </h1>

      {/* ANIMAÇÃO DE CARREGAMENTO */}
      {loading ? (
        <div className="flex flex-col items-center mt-16">
          <div className="loader mb-6"></div>
          <p className="text-lg opacity-80">Analisando gráfico...</p>
        </div>
      ) : (
        <>
          {/* CARD: RECOMENDAÇÃO */}
          <div
            className="w-full mt-6 p-6 rounded-2xl shadow-xl"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${style.color}40`,
              boxShadow: `0 0 20px ${style.color}35`,
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              {style.icon}
              <h2
                className="text-3xl font-bold"
                style={{ color: style.color }}
              >
                {style.label}
              </h2>
            </div>
            <p className="opacity-90 text-lg">
              Confiança da IA:{" "}
              <span style={{ color: style.color }}>{result.confidence}%</span>
            </p>
          </div>

          {/* INFORMAÇÕES TÉCNICAS */}
          <div
            className="w-full mt-6 p-6 rounded-2xl shadow-xl"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid #ffffff15",
            }}
          >
            <h3 className="text-xl font-semibold mb-3">Detalhes Técnicos</h3>
            <p><strong>Tendência:</strong> {result.trend}</p>
            <p><strong>Suporte:</strong> {result.support}</p>
            <p><strong>Resistência:</strong> {result.resistance}</p>
          </div>

          {/* RESUMO FINAL */}
          <div
            className="w-full mt-6 p-6 rounded-2xl shadow-xl"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid #ffffff10",
            }}
          >
            <h3 className="text-xl font-semibold mb-2">Resumo da Análise</h3>
            <p className="opacity-90 leading-relaxed">{result.summary}</p>
          </div>

          {/* BOTÃO VOLTAR */}
          <button
            onClick={() => window.location.href = "/"}
            className="mt-10 px-8 py-3 text-lg font-semibold rounded-full transition"
            style={{
              background: "linear-gradient(90deg, #B44FFF, #7A1FFF)",
              boxShadow: "0 0 20px #7A1FFF80",
            }}
          >
            Nova Análise
          </button>
        </>
      )}

      {/* ANIMAÇÃO CSS */}
      <style>
        {`
          .loader {
            width: 60px;
            height: 60px;
            border: 6px solid #7A1FFF;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 0.9s linear infinite;
            box-shadow: 0 0 15px #7A1FFF90;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </main>
  );
}