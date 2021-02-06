const User = require('../models/User')

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, existingUser) => {
    if (existingUser)
      return res.status(400).json({
        message: "User with this email already exists!",
      });

    const { firstName, lastName, email, password } = req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    newUser.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "Something went wrong!",
        });
      }

      return res.status(201).json({
        user,
      });
    });
  });
}