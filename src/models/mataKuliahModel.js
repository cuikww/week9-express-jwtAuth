import { query } from '../config/db.js';

export const findAll = async () => {
  const sql = `
    SELECT
      mk.id, mk.nama_matkul, mk.jumlah_sks,
      mk.dosen_nidn, d.nama_lengkap as nama_dosen
    FROM matakuliah mk
    LEFT JOIN dosen d ON mk.dosen_nidn = d.nidn
    ORDER BY mk.nama_matkul ASC
  `;
  const { rows } = await query(sql);
  return rows;
};

export const findById = async (id) => {
  const sql = `
    SELECT
      mk.id, mk.nama_matkul, mk.jumlah_sks,
      mk.dosen_nidn, d.nama_lengkap as nama_dosen, d.gelar_akademik
    FROM matakuliah mk
    LEFT JOIN dosen d ON mk.dosen_nidn = d.nidn
    WHERE mk.id = $1
  `;
  const { rows } = await query(sql, [id]);
  return rows[0];
};

export const create = async ({ nama_matkul, jumlah_sks, dosen_nidn }) => {
  const sql = 'INSERT INTO matakuliah (nama_matkul, jumlah_sks, dosen_nidn) VALUES ($1, $2, $3) RETURNING *';
  const { rows } = await query(sql, [nama_matkul, jumlah_sks, dosen_nidn]);
  return rows[0];
};

export const update = async (id, { nama_matkul, jumlah_sks, dosen_nidn }) => {
  const sql = 'UPDATE matakuliah SET nama_matkul = $1, jumlah_sks = $2, dosen_nidn = $3 WHERE id = $4 RETURNING *';
  const { rows } = await query(sql, [nama_matkul, jumlah_sks, dosen_nidn, id]);
  return rows[0];
};

export const remove = async (id) => {
  const { rows } = await query('DELETE FROM matakuliah WHERE id = $1 RETURNING *', [id]);
  return rows[0];
};
