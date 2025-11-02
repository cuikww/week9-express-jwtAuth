import * as MataKuliahModel from '../models/mataKuliahModel.js';

const handleError = (error, req, next) => {
    if (error.code === '23503') { 
      error.message = `Dosen dengan NIDN ${req.body.dosen_nidn} tidak ditemukan.`;
      error.statusCode = 400;
    }
  next(error);
};

export const createMataKuliah = async (req, res, next) => {
  try {
    const matkul = await MataKuliahModel.create(req.body);
    res.status(201).json({ message: 'Mata Kuliah berhasil dibuat', data: matkul });
  } catch (error) {
    handleError(error, req, next);
  }
};

export const getAllMataKuliah = async (req, res, next) => {
  try {
    const matkul = await MataKuliahModel.findAll();
    res.status(200).json({ data: matkul });
  } catch (error) {
    next(error);
  }
};

export const getMataKuliahById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const matkul = await MataKuliahModel.findById(id);
    if (!matkul) {
      const error = new Error('Mata Kuliah tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ data: matkul });
  } catch (error) {
    next(error);
  }
};

export const updateMataKuliah = async (req, res, next) => {
  try {
    const { id } = req.params;
    const matkul = await MataKuliahModel.update(id, req.body);
    if (!matkul) {
      const error = new Error('Mata Kuliah tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Mata Kuliah berhasil diperbarui', data: matkul });
  } catch (error) {
    handleError(error, req, next);
  }
};

export const deleteMataKuliah = async (req, res, next) => {
  try {
    const { id } = req.params;
    const matkul = await MataKuliahModel.remove(id);
    if (!matkul) {
      const error = new Error('Mata Kuliah tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Mata Kuliah berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};
