const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const User = require('../models/user.model');
const Admin = require('../models/admin.model');

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secretKey, async (err, payload) => {
    if (err) {
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
        if (!user) {
          return res.status(401).json({ verified: false });
        }
        req.user = user;
        next();
      } catch (error) {
        return res.status(400).json({ verified: false });
      }
    }
  });
}