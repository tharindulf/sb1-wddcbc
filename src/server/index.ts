import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { router } from './routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static('dist/client'));

// API routes
app.use('/api', router);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile('dist/client/index.html', { root: '.' });
});

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to database');
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();