const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email required!"],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Invalid Email!"
            }
        },
        password: {
            type: String,
            required: [true, "Password required!"],
            minlength: [8, "Password must be 8 characters or longer"]
        }
    },{timestamps: true}
)

// ! Define a 'confirmPassword' field that won't be saved in the database!
UserSchema.virtual('confirmPassword')
.get(() => this._confirmPassword)
.set((value) => this._confirmPassword = value);

// ! Add a custom validation method to make sure the passwords match!
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword)
        this.invalidate("confirmPassword" , "Passwords must match!");

    next();
});

// ! Makes sure the password is hashed before being saved in the database!
UserSchema.pre('save' , function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;