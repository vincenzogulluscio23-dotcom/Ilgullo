import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Persistent Server-Side CMS Database File
  const DATA_DIR = path.join(process.cwd(), 'data');
  const DB_FILE = path.join(DATA_DIR, 'cms-db.json');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // GET /api/cms/data
  app.get('/api/cms/data', (req, res) => {
    try {
      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        return res.json(JSON.parse(content));
      }
      return res.json({ status: 'empty' });
    } catch (e) {
      console.error('Error reading CMS DB:', e);
      return res.status(500).json({ error: 'Failed to read CMS DB' });
    }
  });

  // POST /api/cms/data
  app.post('/api/cms/data', (req, res) => {
    try {
      const data = req.body;
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return res.json({ status: 'success', savedAt: new Date().toISOString() });
    } catch (e) {
      console.error('Error writing CMS DB:', e);
      return res.status(500).json({ error: 'Failed to save CMS DB' });
    }
  });

  // Serve static dist folder or Vite middleware based on environment
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    // Production SPA fallback for all routes (including /superman)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    // Development SPA fallback for all routes (e.g. /superman)
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        if (e instanceof Error) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

