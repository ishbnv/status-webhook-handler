import express from 'express';
import dotenv from 'dotenv';
import { handleWebhook } from './webhook.handler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Единственный роут
app.post('/webhook', handleWebhook);

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});