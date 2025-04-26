import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data
const clients = [
  { id: 1, first_name: 'John', last_name: 'Doe', date_of_birth: '1990-01-01', gender: 'Male' },
  { id: 2, first_name: 'Jane', last_name: 'Smith', date_of_birth: '1992-05-15', gender: 'Female' }
];

const programs = [
  { id: 1, name: 'TB Program', description: 'Tuberculosis treatment and prevention' },
  { id: 2, name: 'Malaria Control', description: 'Malaria prevention and treatment' }
];

// API Routes
app.get('/api/clients', (req, res) => {
  res.json(clients);
});

app.get('/api/clients/:id', (req, res) => {
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
});

app.post('/api/clients', (req, res) => {
  const newClient = {
    id: clients.length + 1,
    ...req.body
  };
  clients.push(newClient);
  res.status(201).json(newClient);
});

app.get('/api/health_programs', (req, res) => {
  res.json(programs);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 