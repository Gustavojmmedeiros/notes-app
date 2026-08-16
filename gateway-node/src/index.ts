import express from 'express';
import cors from 'cors';
import notesRouter from './routes/notes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Gateway rodando na porta ${PORT}`);
});