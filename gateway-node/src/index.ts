import express from 'express';
import notesRouter from './routes/notes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Gateway rodando na porta ${PORT}`);
});