// Vercel serverless function – same logic as Express route
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

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const productName = (req.body?.productName || '').trim();
  if (!productName) {
    return res.status(400).json({ error: 'Product name is required' });
  }

  const headlines = headlineFormulas.map((fn) => fn(productName));
  res.status(200).json({ headlines });
}
