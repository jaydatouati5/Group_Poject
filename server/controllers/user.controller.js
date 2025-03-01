const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// Get one by id
module.exports.getOne = (req, res) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err));
}

module.exports.register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ errors: { email: { message: 'Email already exists' } } });
        }

        const user = await User.create(req.body);
        const userToken = jwt.sign({ id: user._id }, secretKey);
        res
            .cookie("usertoken", userToken, { httpOnly: true, secure: false })
            .json({ msg: "Success!", user: user });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.login = async(req , res) => {
    const user = await User.findOne({email: req.body.email});

    if (user === null){
        return res.status(400).json({email: "Email not Found!"});
    }


    const correctPassword = await bcrypt.compare(req.body.password , user.password);

    if (!correctPassword){
        return res.status(400).json({password: "Incorrect password!"});
    }

    const userToken = jwt.sign({id: user._id} , secretKey);
    res
    .cookie("usertoken" , userToken , {httpOnly: true , secure: false})
    .json({msg: "Success!", user: { _id: user._id, email: user.email }});
}

module.exports.logout = (req , res) => {
    res.clearCookie("usertoken");
    res.status(200).json({msg: "Logged Out!"});
}

module.exports.getAll = (req , res) => {
    User.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
}

module.exports.checkAuth = (req, res) => {
    jwt.verify(req.cookies.usertoken, secretKey, async (err, payload) => {
        if (err) {
            return res.status(401).json({ verified: false });
        }
        try {
            const user = await User.findById(payload.id);
            if (!user) {
                return res.status(401).json({ verified: false });
            }
            res.json({ verified: true, user: { _id: user._id, email: user.email } });
        } catch (error) {
            return res.status(400).json({ verified: false });
        }
    });
};

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
}