const { User } = require('../models');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    console.log('New user created:', newUser);
    // Redirect to login page after successful signup
    res.redirect('/auth/login');
  } catch (err) {
    console.error('Error during signup:', err);
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

    // Set session user
    req.session.loggedIn = true;
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    console.log('User logged in:', user);
    // Redirect to a dashboard or home page after successful login
    res.redirect('/');
  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).json(err);
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to log out' });
    }
    res.redirect('/');
  });
};

module.exports = {
  signup,
  login,
  logout
};
