const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Headline formulas – proven ad copy structures
const headlineFormulas = [
  (name) => `Discover Why Thousands Switched to ${name}`,
  (name) => `The ${name} Secret Top Marketers Don't Share`,
  (name) => `How ${name} Can Transform Your Results in 30 Days`,
  (name) => `Stop Wasting Money. Try ${name} Instead.`,
  (name) => `${name}: The Smart Choice Everyone's Talking About`,
  (name) => `Get More From Less With ${name}`,
  (name) => `Why ${name}? Because Your Time Is Worth It.`,
  (name) => `The ${name} Method: Simple. Fast. Effective.`,
  (name) => `Ready for Better? ${name} Delivers.`,
  (name) => `${name} — Where Quality Meets Simplicity`,
];

app.post('/api/generate-headlines', (req, res) => {
  const productName = (req.body?.productName || '').trim();
  if (!productName) {
    return res.status(400).json({ error: 'Product name is required' });
  }
  const headlines = headlineFormulas.map((fn) => fn(productName));
  res.json({ headlines });
});

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
