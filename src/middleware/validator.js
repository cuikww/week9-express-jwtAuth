export const validateDosen = (req, res, next) => {
  const { nidn, nama_lengkap, gaji_pokok, tanggal_bergabung } = req.body;

  if (!nidn || nidn.trim() === '') {
    return res.status(400).json({ message: 'nidn tidak boleh kosong' });
  }
  if (!nama_lengkap || nama_lengkap.trim() === '') {
    return res.status(400).json({ message: 'nama_lengkap tidak boleh kosong' });
  }
  if (gaji_pokok === undefined) {
    return res.status(400).json({ message: 'gaji_pokok tidak boleh kosong' });
  }
  if (!tanggal_bergabung) {
    return res.status(400).json({ message: 'tanggal_bergabung tidak boleh kosong' });
  }
  
  next();
};

export const validateMataKuliah = (req, res, next) => {
  const { nama_matkul, jumlah_sks } = req.body;

  if (!nama_matkul || nama_matkul.trim() === '') {
    return res.status(400).json({ message: 'nama_matkul tidak boleh kosong' });
  }
  if (jumlah_sks === undefined) {
    return res.status(400).json({ message: 'jumlah_sks tidak boleh kosong' });
  }

  next();
};

export const validateRegister = (req, res, next) => {
  const { nidn, nama_lengkap, email, password, gaji_pokok, tanggal_bergabung } = req.body;

  if (!nidn || nidn.trim() === '') {
    return res.status(400).json({ message: 'nidn tidak boleh kosong' });
  }
  if (!nama_lengkap || nama_lengkap.trim() === '') {
    return res.status(400).json({ message: 'nama_lengkap tidak boleh kosong' });
  }
  if (!email || email.trim() === '') {
    return res.status(400).json({ message: 'email tidak boleh kosong' });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'password minimal 6 karakter' });
  }
  if (gaji_pokok === undefined) {
    return res.status(400).json({ message: 'gaji_pokok tidak boleh kosong' });
  }
  if (!tanggal_bergabung) {
    return res.status(400).json({ message: 'tanggal_bergabung tidak boleh kosong' });
  }
  
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || email.trim() === '') {
    return res.status(400).json({ message: 'email tidak boleh kosong' });
  }
  if (!password || password.trim() === '') {
    return res.status(400).json({ message: 'password tidak boleh kosong' });
  }

  next();
}


