const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  signup,
  login
};
