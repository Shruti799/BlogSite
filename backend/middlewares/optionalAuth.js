// const passport = require("passport");

// const optionalAuth = (req, res, next) => {
//   passport.authenticate("jwt", { session: false }, (error, user, info) => {
//     if (error || !user) {
//       req.user = null;
//       return next();
//     }
//     req.user = user;
//     return next();
//   })(req, res, next);
// };

// module.exports = optionalAuth;

const jwt = require("jsonwebtoken");

const optionalAuth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    req.user = null;
    return next(); // Allow access without authentication
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID if token is valid
  } catch (error) {
    req.user = null; // Proceed as an unauthenticated user
  }

  return next();
};

module.exports = optionalAuth;
