import { query } from '../config/db.js';

export const findAll = async () => {
  const sql = `
    SELECT nidn, nama_lengkap, email, gelar_akademik, 
           gaji_pokok, tanggal_bergabung, status_aktif 
    FROM dosen ORDER BY nama_lengkap ASC
  `;
  const { rows } = await query(sql);
  return rows;
};
export const findById = async (nidn) => {
  const sql = `
    SELECT nidn, nama_lengkap, email, gelar_akademik, 
           gaji_pokok, tanggal_bergabung, status_aktif 
    FROM dosen WHERE nidn = $1
  `;
  const { rows } = await query(sql, [nidn]);
  return rows[0];
};

export const findByEmail = async (email) => {
  const { rows } = await query('SELECT * FROM dosen WHERE email = $1', [email]);
  return rows[0];
};

export const create = async (data) => {
  const { nidn, nama_lengkap, email, password, gelar_akademik, gaji_pokok, tanggal_bergabung, status_aktif } = data;
  const sql = `
    INSERT INTO dosen (nidn, nama_lengkap, email, password, gelar_akademik, gaji_pokok, tanggal_bergabung, status_aktif)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `;
  const params = [nidn, nama_lengkap, email, password, gelar_akademik, gaji_pokok, tanggal_bergabung, status_aktif];
  const { rows } = await query(sql, params);
  return rows[0];
};

export const update = async (nidn, data) => {
  const fields = [];
  const values = [];
  let paramIndex = 1;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
  }

  if (fields.length === 0) {
    return findById(nidn); 
  }

  values.push(nidn);
  const sql = `
    UPDATE dosen SET ${fields.join(', ')}
    WHERE nidn = $${paramIndex}
    RETURNING nidn, nama_lengkap, email, gelar_akademik, 
              gaji_pokok, tanggal_bergabung, status_aktif
  `;
  
  const { rows } = await query(sql, values);
  return rows[0];
};

export const remove = async (nidn) => {
  const { rows } = await query('DELETE FROM dosen WHERE nidn = $1 RETURNING *', [nidn]);
  return rows[0];
};
