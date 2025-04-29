const jwt = require('jsonwebtoken');


// Middleware to verify the admin token
const verifyAdminToken = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify token
  jwt.verify(token, 'your_jwt_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.admin = decoded; // Store decoded token data in req.admin
    next();
  });
};



module.exports = verifyAdminToken;
