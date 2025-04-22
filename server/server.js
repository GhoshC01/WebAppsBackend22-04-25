import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Admin API running...');
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('MySQL DB synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
