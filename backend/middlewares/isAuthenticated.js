// const passport = require("passport");

// const isAuthenticated = (req, res, next) => {
//   passport.authenticate("jwt", { session: false }, (error, user, info) => {
//     if (error || !user) {
//       return res.status(401).json({
//         message: info ? info?.message : "Login required, no token found",
//         error: error ? error?.message : undefined,
//       });
//     }
//     //place the user in the req obj
//     req.user = user?._id;
//     //call next
//     return next();
//   })(req, res, next);
// };

// module.exports = isAuthenticated;

const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Login required, no token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Store user ID in request
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = isAuthenticated;
