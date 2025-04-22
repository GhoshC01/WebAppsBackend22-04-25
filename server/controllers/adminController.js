import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  const existingAdmin = await Admin.findOne({ where: { email } });

  if (existingAdmin) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const admin = await Admin.create({ email, password });

  res.status(201).json({
    id: admin.id,
    email: admin.email,
    token: generateToken(admin.id),
  });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ where: { email } });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      id: admin.id,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
