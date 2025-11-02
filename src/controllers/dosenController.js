import * as DosenModel from '../models/dosenModel.js';

const handleError = (error, req, next) => {
  if (error.code === '23505') { 
    error.message = `NIDN atau Email sudah terdaftar.`;
    error.statusCode = 400;
  }
  next(error);
};

export const createDosen = async (req, res, next) => {
  try {
    const dosen = await DosenModel.create(req.body);
    res.status(201).json({ message: 'Dosen berhasil dibuat', data: dosen });
  } catch (error) {
    handleError(error, req, next);
  }
};

export const getAllDosen = async (req, res, next) => {
  try {
    const dosen = await DosenModel.findAll();
    res.status(200).json({ data: dosen });
  } catch (error) {
    next(error);
  }
};

export const getDosenByNidn = async (req, res, next) => {
  try {
    const { nidn } = req.params;
    const dosen = await DosenModel.findById(nidn);
    if (!dosen) {
      const error = new Error('Dosen tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ data: dosen });
  } catch (error) {
    next(error);
  }
};

export const updateDosen = async (req, res, next) => {
  try {
    const { nidn } = req.params;
    const dosen = await DosenModel.update(nidn, req.body);
    if (!dosen) {
      const error = new Error('Dosen tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Dosen berhasil diperbarui', data: dosen });
  } catch (error) {
    handleError(error, req, next);
  }
};

export const deleteDosen = async (req, res, next) => {
  try {
    const { nidn } = req.params;
    const dosen = await DosenModel.remove(nidn);
    if (!dosen) {
      const error = new Error('Dosen tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Dosen berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};
