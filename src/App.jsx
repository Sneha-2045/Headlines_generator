import { useState } from 'react';
import './App.css';

const API_BASE = '/api';

export default function App() {
  const [productName, setProductName] = useState('');
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const generateHeadlines = async () => {
    const name = productName.trim();
    if (!name) {
      setError('Enter a product name');
      return;
    }
    setError('');
    setHeadlines([]);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/generate-headlines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName: name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      setHeadlines(data.headlines || []);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(index);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">◆</span>
          <h1>Headline Forge</h1>
        </div>
        <p className="tagline">10 ad headlines from one product name</p>
      </header>

      <main className="main">
        <section className="hero">
          <div className="input-wrap">
            <input
              type="text"
              className="input"
              placeholder="e.g. CloudSync Pro, GreenBite Snacks"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateHeadlines()}
              disabled={loading}
            />
            <button
              className="btn-generate"
              onClick={generateHeadlines}
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Generating…
                </span>
              ) : (
                'Generate Headlines'
              )}
            </button>
          </div>
          {error && <p className="error-msg">{error}</p>}
        </section>

        {headlines.length > 0 && (
          <section className="headlines-section">
            <h2 className="section-title">Your 10 Headlines</h2>
            <p className="section-hint">Click any headline to copy</p>
            <ul className="headlines-list">
              {headlines.map((headline, i) => (
                <li
                  key={i}
                  className="headline-card"
                  style={{ animationDelay: `${i * 0.06}s` }}
                  onClick={() => copyToClipboard(headline, i)}
                >
                  <span className="headline-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="headline-text">{headline}</span>
                  <span className={`copy-feedback ${copiedId === i ? 'visible' : ''}`}>
                    {copiedId === i ? 'Copied!' : 'Click to copy'}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <footer className="footer">
        <span>Built for ads that convert</span>
      </footer>
    </div>
  );
}
