import jwt from 'jsonwebtoken'
import config from '../config';

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }
  
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      req.user = decoded;
      res.locals.user = decoded
      next();
    });
}