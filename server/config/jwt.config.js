const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

module.exports.authenticate = (req, res, next) => {
  console.log(req.url)
  jwt.verify(req.cookies.usertoken, secretKey, async (err, payload) => {
    if (err) {
        console.log("Error",err)
      jwt.verify(req.cookies.admintoken, secretKey, async (err, payload) => {
        if (err) {
          res.status(401).json({verified: false});
        } else {
          try {
            const admin = await Admin.findById(payload.id);
            if (!admin) {
              return res.status(401).json({ verified: false });
            }
            req.admin = admin;
            next();
          } catch (error) {
            return res.status(400).json({ verified: false });
          }
        }
      })
    } else {
      try {
        const user = await User.findById(payload.id);
        console.log(user.firstName , user.lastName) 
        if (!user) {
          return res.status(401).json({ verified: false });
        }
        // console.log(req.user)
        req.user = user;
        next();
        console.log("went to next")
      } catch (error) {
        console.log(error )
        return res.status(400).json({ verified: false });
      }
    }
  });
}