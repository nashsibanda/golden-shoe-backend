const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
};

exports.login = (roleLevel = "user") => (req, res) => {
  User.findOne({ email: req.body.email })
    .then(foundUser => {
      if (!foundUser) {
        return res.status(400).json({ message: "Invalid login credentials" });
      }

      if (foundUser.authenticate(req.body.password)) {
        if (roleLevel === "admin" && foundUser.role != "admin") {
          return res.status(401).json({
            message: "This user is not authorized to administer this site",
          });
        }

        const { email, firstName, lastName, role, _id, fullName } = foundUser;
        const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.json({
          token,
          user: {
            _id,
            email,
            firstName,
            lastName,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid login credentials" });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(400).json(error);
    });
};

exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  req.user = userId;
  next();
};