"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePaisStore } from "../presentation/store/pais.state";

export default function Home() {
  const { paises, loading, error, loadAllPaises, reset } = usePaisStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Clean Architecture Demo</h1>

        <div style={styles.buttonGroup}>
          <Link href="/home">
            <button style={styles.button}>Ir para Home</button>
          </Link>

          <button
            onClick={loadAllPaises}
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              ...(loading && styles.disabledButton),
            }}
          >
            {loading ? "⏳ Carregando..." : "🌍 Buscar Países"}
          </button>
        </div>

        {error && (
          <div style={styles.errorBox}>
            ❌ <strong>Erro:</strong> {error}
          </div>
        )}

        {paises.length > 0 && (
          <div style={styles.resultsContainer}>
            <h2 style={styles.subtitle}>Países Carregados: {paises.length}</h2>

            <div style={styles.grid}>
              {paises.slice(0, 12).map((pais) => (
                <div key={pais.iso2} style={styles.card}>
                  <h3 style={styles.cardTitle}>{pais.nome.pt}</h3>
                  <p style={styles.cardInfo}>
                    <strong>Código:</strong> {pais.iso2}
                  </p>
                  <p style={styles.cardInfo}>
                    <strong>Capital:</strong> {pais.capital}
                  </p>
                  <p style={styles.cardInfo}>
                    <strong>Região:</strong> {pais.regiao}
                  </p>
                  <p style={styles.cardInfo}>
                    <strong>Moeda:</strong> {pais.moeda}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textAlign: "center" as const,
    marginBottom: "30px",
    color: "#333",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#e0e0e0",
    color: "#333",
    fontWeight: "500",
    transition: "all 0.3s",
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  disabledButton: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  errorBox: {
    backgroundColor: "#ffebee",
    border: "1px solid #f44336",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "20px",
    color: "#c62828",
  },
  resultsContainer: {
    marginTop: "30px",
  },
  subtitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#2c3e50",
    borderBottom: "2px solid #4CAF50",
    paddingBottom: "8px",
  },
  cardInfo: {
    margin: "8px 0",
    color: "#555",
    fontSize: "14px",
  },
};
