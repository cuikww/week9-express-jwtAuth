import * as DosenModel from '../models/dosenModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const handleError = (error, next) => {
  if (error.code === '23505') {
    error.message = `NIDN atau Email sudah terdaftar.`;
    error.statusCode = 400;
  }
  next(error);
};

export const register = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const dataDosenBaru = {
      ...req.body,
      password: hashedPassword,
    };

    const dosen = await DosenModel.create(dataDosenBaru);

    delete dosen.password;

    res.status(201).json({ message: 'Dosen berhasil diregistrasi', data: dosen });
  } catch (error) {
    handleError(error, next);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const dosen = await DosenModel.findByEmail(email);
    if (!dosen || !dosen.password) {
      const error = new Error('Email atau password salah');
      error.statusCode = 401;
      throw error;
    }


    const isPasswordValid = bcrypt.compareSync(password, dosen.password);
    if (!isPasswordValid) {
      const error = new Error('Email atau password salah');
      error.statusCode = 401;
      throw error;
    }

    const payload = {
      nidn: dosen.nidn,
      email: dosen.email,
      nama_lengkap: dosen.nama_lengkap,
    };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET belum diatur di .env');
    }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login berhasil',
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
