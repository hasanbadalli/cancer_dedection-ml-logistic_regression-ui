import { useState } from "react";
import "../styles/calculation.css";
import { FEATURE_SECTIONS } from "../data/features";

export default function Calculation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const toSnakeCase = (key) => key.replaceAll(" ", "_");

  const [formData, setFormData] = useState(() => {
    const initial = {};
    FEATURE_SECTIONS.forEach((section) => {
      Object.entries(section.fields).forEach(([key, value]) => {
        initial[key] = value;
      });
    });
    return initial;
  });

  function handleChange(key, value) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleCalculate() {
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = {};
    Object.entries(formData).forEach(([key, value]) => {
      payload[toSnakeCase(key)] = value;
    });

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setResult(data);
    } catch {
      setError("API ilə əlaqə qurulmadı");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="header">
        <h1>Cancer Risk Assessment</h1>
        <p>
          Aşağıdakı dəyərlər ML model üçün istifadə olunur. Default nümunə
          avtomatik doldurulub.
        </p>
      </div>

      {FEATURE_SECTIONS.map((section) => (
        <div className="section" key={section.title}>
          <div className="section-title">{section.title}</div>

          <div className="form-grid">
            {Object.keys(section.fields).map((key) => (
              <Input
                key={key}
                label={key}
                value={formData[key]}
                onChange={(val) => handleChange(key, val)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Sticky action bar */}
      <div className="action-bar">
        <span className="action-hint">
          Bütün dəyərlər doldurulduqdan sonra hesablayın
        </span>

        <button className="button" onClick={handleCalculate} disabled={loading}>
          {loading ? "Calculating..." : "Calculate Risk"}
        </button>
      </div>

      {/* Result */}
      <div className="section">
        <div className="section-title">Result</div>

        {!result && !error && <p>Hesablama gözlənilir…</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {result && (
          <div
            className={`result ${
              result.prediction === "benign" ? "safe" : "danger"
            }`}
          >
            <span
              className={
                result.prediction === "benign" ? "badge-safe" : "badge-danger"
              }
            >
              {result.prediction.toUpperCase()}
            </span>

            <h3 style={{ marginTop: 8 }}>Risk Assessment Result</h3>

            <div className="prob">
              <p>
                Benign probability:{" "}
                <strong>{(result.probability.benign * 100).toFixed(2)}%</strong>
              </p>
              <p>
                Malignant probability:{" "}
                <strong>
                  {(result.probability.malignant * 100).toFixed(2)}%
                </strong>
              </p>
              <p style={{ fontSize: 12, marginTop: 6 }}>
                Threshold used: {result.threshold_used.toFixed(3)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
