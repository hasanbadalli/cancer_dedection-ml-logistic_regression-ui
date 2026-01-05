import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/home.css";

const CODE = `from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(X_train, y_train)

prob = model.predict_proba(sample)`;

export default function Home() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    const interval = setInterval(() => {
      if (direction === "forward") {
        if (index < CODE.length) {
          setText(CODE.slice(0, index + 1));
          setIndex((i) => i + 1);
        } else {
          setDirection("backward");
        }
      } else {
        if (index > 20) {
          setText(CODE.slice(0, index - 1));
          setIndex((i) => i - 1);
        } else {
          setDirection("forward");
        }
      }
    }, 35);

    return () => clearInterval(interval);
  }, [index, direction]);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <h1>
          AI-Driven <span>Cancer</span>
          <br />
          Risk Estimation
        </h1>

        <p>
          A modern demonstration of how machine learning models can assist in
          medical risk analysis.
        </p>
      </section>

      {/* PURPOSE */}
      <section className="block">
        <h2>Why this project?</h2>
        <p>
          This application showcases how <strong>Logistic Regression</strong>
          can be used to estimate cancer risk from biologic measurements.
        </p>
        <p>
          It is designed for{" "}
          <strong>education, transparency, and research</strong> — not for
          clinical diagnosis.
        </p>
      </section>

      {/* CODE */}
      <section className="block">
        <h2>Model in Action</h2>

        <div className="code-box">
          <SyntaxHighlighter
            language="python"
            style={oneLight}
            customStyle={{
              margin: 0,
              background: "transparent",
              fontSize: 13,
            }}
          >
            {text}
          </SyntaxHighlighter>
        </div>

        <span className="code-hint">
          Simplified illustration — full implementation is documented in AI
          Docs.
        </span>
      </section>

      {/* HOW */}
      <section className="block">
        <h2>Concept Overview</h2>
        <p>
          The model outputs probabilities instead of absolute decisions,
          enabling threshold-based interpretation rather than binary judgment.
        </p>
      </section>
    </div>
  );
}
