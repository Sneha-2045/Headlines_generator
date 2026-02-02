# Headline Forge

Generate 10 ad headlines from any product name. Built with React (Vite) and Express.

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

## API

**POST** `/api/generate-headlines`

Body: `{ "productName": "Your Product Name" }`  
Response: `{ "headlines": ["...", ...] }` (10 headlines)
