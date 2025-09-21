// middleware/auth.js
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // console.log(req.headers);
  
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token);
  
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = auth;
