# Headline Forge

Generate 10 ad headlines from any product name. Built with React (Vite) and Express.

## Environment variables

Copy `env.example` to `.env` and adjust as needed:

| Variable | Where | Description |
|----------|--------|-------------|
| `PORT` | Server | Port for the Express API (default: 3001). |
| `VITE_API_URL` | Client | API base URL. Omit or set to `/api` when using a proxy or same host. Set to full URL (e.g. `https://api.yoursite.com`) when the API is on another domain. |

## Run locally

```bash
npm install
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3001](http://localhost:3001)

## Scripts

| Command       | Description                    |
|--------------|--------------------------------|
| `npm run dev`| Start both client and server   |
| `npm run client` | Vite dev server only       |
| `npm run server` | Express API only           |
| `npm run build`  | Build React for production |
| `npm run start`  | Run server (after build)   |

## Deploy on Vercel

1. Push the repo to GitHub (or connect another Git provider).
2. In [Vercel](https://vercel.com): **Add New Project** → import the repo.
3. Leave **Build Command** and **Output Directory** as default (or use `npm run build` and `dist`). Vercel will use `vercel.json` if present.
4. **Environment variables** (optional): add `VITE_API_URL` only if your API is on another domain. For a single Vercel deployment, leave it unset so the app uses `/api`.
5. Deploy. The React app is built from `dist`, and `/api/generate-headlines` is handled by the serverless function in `api/generate-headlines.js`.

No `PORT` or Node server is used on Vercel; the API runs as a serverless function.

## API

**POST** `/api/generate-headlines`

Body: `{ "productName": "Your Product Name" }`  
Response: `{ "headlines": ["...", ...] }` (10 headlines)
