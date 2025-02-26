const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

module.exports.register = async (req, res) => {
    try {
        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) {
            return res.status(400).json({ errors: { email: { message: 'Email already exists' } } });
        }

        const admin = await Admin.create(req.body);
        const adminToken = jwt.sign({ id: admin._id }, secretKey);
        res
            .cookie("admintoken", adminToken, { httpOnly: true, secure: false })
            .json({ msg: "Success!", admin: admin });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.login = async(req , res) => {
    const admin = await Admin.findOne({email: req.body.email});

    if (admin === null){
        return res.status(400).json({msg: "Email not Found!"});
    }


    const correctPassword = await bcrypt.compare(req.body.password , admin.password);

    if (!correctPassword){
        return res.status(400).json({msg: "Incorrect password!"});
    }

    const adminToken = jwt.sign({id: admin._id} , secretKey);
    res
    .cookie("admintoken" , adminToken , {httpOnly: true , secure: false})
    .json({msg: "Success!", admin: { _id: admin._id, email: admin.email }});
}

module.exports.logout = (req , res) => {
    res.clearCookie("admintoken");
    res.status(200).json({msg: "Logged Out!"});
}

module.exports.getAll = (req , res) => {
    Admin.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
}

module.exports.checkAuth = (req, res) => {
    jwt.verify(req.cookies.admintoken, secretKey, async (err, payload) => {
      if (err) {
        return res.status(401).json({ verified: false });
      }
      try {
        const admin = await Admin.findById(payload.id);
        if (!admin) {
          return res.status(401).json({ verified: false });
        }
        res.json({ verified: true, admin: { _id: admin._id, email: admin.email } });
      } catch (error) {
        return res.status(400).json({ verified: false });
      }
    });
  };

module.exports.updateAdmin = (req, res) => {
    Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedAdmin => res.json(updatedAdmin))
        .catch(err => res.status(400).json(err));
}
