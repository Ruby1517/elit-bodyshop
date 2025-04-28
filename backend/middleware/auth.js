const jwt = require('jsonwebtoken');

const protectAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = { protectAdmin };
