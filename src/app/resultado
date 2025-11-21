"use client";

import { useSearchParams } from "next/navigation";
import { ArrowUpCircle, ArrowDownCircle, Timer } from "lucide-react";

export default function ResultadoPage() {
  const params = useSearchParams();
  const recommendation = params.get("reco") || "HOLD";
  const confidence = params.get("conf") || "0";
  const trend = params.get("trend") || "—";
  const analysis = params.get("analysis") || "—";

  const getColor = () => {
    if (recommendation === "BUY") return "#00ff85";
    if (recommendation === "SELL") return "#ff3b3b";
    return "#ffd93b"; // HOLD amarelo
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "radial-gradient(circle at top, #3a0066, #0d0018)",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          textShadow: "0 0 15px #a855f7",
        }}
      >
        Resultado da Análise
      </h1>

      {/* Card principal */}
      <div
        style={{
          borderRadius: "20px",
          padding: "25px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Animação simulada */}
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 25px",
            borderRadius: "50%",
            border: "4px solid rgba(255,255,255,0.2)",
            borderTopColor: getColor(),
            animation: "spin 1.4s linear infinite",
          }}
        ></div>

        {/* Recomendação */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          {recommendation === "BUY" && (
            <ArrowUpCircle size={70} color="#00ff85" />
          )}

          {recommendation === "SELL" && (
            <ArrowDownCircle size={70} color="#ff3b3b" />
          )}

          {recommendation === "HOLD" && <Timer size={70} color="#ffd93b" />}

          <h2
            style={{
              marginTop: "15px",
              fontSize: "32px",
              fontWeight: "700",
              color: getColor(),
              textShadow: `0 0 10px ${getColor()}`,
            }}
          >
            {recommendation}
          </h2>

          <p style={{ opacity: 0.8, marginTop: "6px" }}>
            Confiança: {confidence}%
          </p>
        </div>

        {/* Detalhes */}
        <div style={{ marginTop: "25px" }}>
          <h3 style={{ opacity: 0.9, fontSize: "18px" }}>Tendência</h3>
          <p style={{ opacity: 0.7, marginBottom: "15px" }}>{trend}</p>

          <h3 style={{ opacity: 0.9, fontSize: "18px" }}>Resumo</h3>
          <p style={{ opacity: 0.7 }}>{analysis}</p>
        </div>
      </div>

      {/* Botão voltar */}
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          marginTop: "40px",
          width: "100%",
          padding: "18px",
          borderRadius: "14px",
          fontSize: "18px",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          background:
            "linear-gradient(90deg, #b026ff, #6d28d9, #9333ea, #c084fc)",
          boxShadow: "0 0 20px #7c3aed",
        }}
      >
        Nova Análise
      </button>

      {/* Animação CSS */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </main>
  );
}