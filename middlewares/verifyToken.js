
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.cookies.jwt;

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).redirect('/')
      req.user = user;
      next();
    });
  } else {
    res.redirect("/");
  }
};

const userVerifyToken = (req, res, next) => {
  const authHeader = req.cookies.jwt;

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.JWT_USER_SEC, (err, user) => {
      if (err) res.status(403).redirect('/')
      req.user = user;
      next();
    });
  } else {
    res.redirect("/");
  }
};





// const verifyUserAndAdmin = (req, res, next) => {
//   const adminToken = req.cookies.admin_jwt
//   const userToken = req.cookies.jwt

//   if (adminToken) {
//     const token = adminToken
//     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.admin = user;
//       next();
//     });
//   }
//   else if (userToken) {
//     const token = userToken
//     jwt.verify(token, process.env.JWT_USER_SEC, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.user = user;
//       next();
//     });
//   }
//   else {
//     res.redirect('/')
//   }


// };





module.exports = {
  verifyToken,
  userVerifyToken
  
};
