const jwt = require('jsonwebtoken');
const { envVars } = require('../config/envVars');

function authenticateApi(req, res, next) {
  // Get the token from the request headers or query parameter or wherever you send it
  const bearer_token = req.headers['authorization'];

  if (!bearer_token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  const secretKey = envVars.JWT_SECRET;
  const token = bearer_token.split(' ')?.[1];
  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // If verification is successful, you can optionally attach the user object to the request
    req.user = user;

    // Continue with the next middleware or route handler
    next();
  });
}

module.exports = authenticateApi;
