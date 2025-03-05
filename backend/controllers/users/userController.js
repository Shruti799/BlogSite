// const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const passport = require("passport");
// const User = require("../../models/User/User");

// //-----User Controller---

// const userController = {
//   // !Register
//   register: asyncHandler(async (req, res) => {
//     const { username, email, password } = req.body;
//     //Check if username already exist
//     const userFound = await User.findOne({ username, email });
//     if (userFound) {
//       throw new Error("User already exists");
//     }
//     //Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     //Register the user
//     const userRegistered = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });
//     //send the response
//     res.status(201).json({
//       status: "success",
//       message: "User registered successfully",
//       userRegistered,
//     });
//   }),


//   // ! Login
//   login: asyncHandler(async (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//       if (err) return next(err);
//       //check if user not found
//       if (!user) {
//         return res.status(401).json({ message: info.message });
//       }
//       //generate token
//       const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);
//       //set the token into cookie
//       res.cookie("token", token, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "None",
//         maxAge: 24 * 60 * 60 * 1000, //1 day
//       });

//       //send the response
//       res.json({
//         status: "success",
//         message: "Login Success",
//         username: user?.username,
//         email: user?.email,
//         _id: user?._id,
//       });
//     })(req, res, next);
//   }),


//   // ! googleAuth-->
//   googleAuth: passport.authenticate("google", { scope: ["profile"] }),
//   // ! GoogleAuthCallback
//   googleAuthCallback: asyncHandler(async (req, res, next) => {
//     passport.authenticate(
//       "google",
//       {
//         failureRedirect: "/login",
//         session: false,
//       },
//       (err, user, info) => {
//         if (err) return next(err);
//         if (!user) {
//           return res.redirect("https://bloggers-vdm1.onrender.com/google-login-error");
//         }
//         //generate the token

//         const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
//           expiresIn: "3d",
//         });
//         //set the token into the cooke
//         res.cookie("token", token, {
//           httpOnly: true,
//           secure: true,
//           sameSite: "None",
//           maxAge: 24 * 60 * 60 * 1000, //1 day:
//         });
//         //redirect the user dashboard
//         res.redirect("https://bloggers-vdm1.onrender.com/dashboard");
//       }
//     )(req, res, next);
//   }),
  

//   // ! check user authentication status
//   checkAuthenticated: asyncHandler(async (req, res) => {
//     const token = req.cookies["token"];
//     if (!token) {
//       return res.status(401).json({ isAuthenticated: false });
//     }
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       //find the user
//       const user = await User.findById(decoded.id);
//       if (!user) {
//         return res.status(401).json({ isAuthenticated: false });
//       } else {
//         return res.status(200).json({
//           isAuthenticated: true,
//           _id: user?._id,
//           username: user?.username,
//           profilePicture: user?.profilePicture,
//         });
//       }
//     } catch (error) {}
//     return res.status(401).json({ isAuthenticated: false, error });
//   }),
  
//    // ! Logout
//    logout: asyncHandler(async (req, res) => {
//     res.cookie("token", "", { maxAge: 1 });
//     res.status(200).json({ message: "Logout success" });
//   }),

//   //! Profile
//    profile: asyncHandler(async (req, res) => {
//      const user = await User.findById(req.user)
//        .populate("posts") // Keep only the posts
//        .select("-password"); // Exclude sensitive fields
   
//      if (!user) {
//        res.status(404);
//        throw new Error("User not found");
//      }
   
//      res.json({ user });
//    }),

// };


// module.exports = userController;

const asyncHandler = require("express-async-handler"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User/User");

const userController = {

  // Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const userFound = await User.findOne({ username, email });
    if (userFound) throw new Error("User already exists");
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRegistered = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ status: "success", message: "User registered successfully", userRegistered });
  }),

  // login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  
    res.json({ token, user });
  }),

  // Google Auth
googleAuth: passport.authenticate("google", { scope: ["email"] }),

// Google Auth Callback
googleAuthCallback: asyncHandler(async (req, res, next) => {
    passport.authenticate("google", { session: false }, async (err, user, info) => {
        if (err) {
            console.error("Google Auth Error:", err);
            return next(err);
        }

        if (!user) {
            console.error("User Not Found in Google Auth");
            return res.redirect("https://bloggers-vdm1.onrender.com/google-login-error");
        }

        try {
            // Check if user already exists in the database
            let existingUser = await User.findOne({ googleId: user.googleId });

            if (!existingUser) {
                // Ensure email exists (fix for "User Not Found")
                let email = "";
                if (Array.isArray(user.emails) && user.emails.length > 0) {
                    email = user.emails[0].value;
                }

                existingUser = await User.create({
                    username: user.displayName || user.username,
                    email,
                    googleId: user.googleId,
                    //profilePicture: user.photos?.[0]?.value || "",
                    authMethod: "google",
                });

                console.log("New Google User Created:", existingUser);
            }

            // Generate JWT token
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

            // Redirect with token in the URL
            res.redirect(`https://bloggers-vdm1.onrender.com/dashboard?token=${token}`);

        } catch (dbError) {
            console.error("Database Error in Google Auth:", dbError);
            return res.redirect("https://bloggers-vdm1.onrender.com/google-login-error");
        }
    })(req, res, next);
}),


  // Check Authentication Status
  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies["token"];
    if (!token) return res.status(401).json({ isAuthenticated: false });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ isAuthenticated: false });

      res.status(200).json({ isAuthenticated: true, _id: user?._id, username: user?.username, profilePicture: user?.profilePicture });
    } catch (error) {
      return res.status(401).json({ isAuthenticated: false, error });
    }
  }),

  // Logout
  logout: asyncHandler(async (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "Logout success" });
  }),

  // Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user).populate("posts").select("-password");
    if (!user) throw new Error("User not found");
    res.json({ user });
  }),
};

module.exports = userController;
