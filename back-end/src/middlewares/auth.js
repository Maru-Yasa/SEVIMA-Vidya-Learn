import jwt from 'jsonwebtoken'
import config from '../config';

export const authenticateToken = (req, res, next) => {
    // Ambil token dari header Authorization
    const token = req.headers.authorization.split(' ')[1];
  
    // Periksa apakah token ada
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }
  
    // Verifikasi token
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
  
      // Simpan ID pengguna yang terdekripsi dalam objek req.user untuk digunakan pada permintaan berikutnya
      req.user = decoded;
  
      // Lanjutkan ke permintaan selanjutnya
      next();
    });
}