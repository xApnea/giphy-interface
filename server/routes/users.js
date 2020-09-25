const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('./../../db/model.js');

router.post('/register', async (req, res) => {
  let data = req.body;

  // Validate user information
  if (!data.email || !data.username || !data.password || !data.confirmPassword) {
    res.status(400).send('Please fill all of the fields to register.');
  }
  if (data.password.length < 6) {
    res.status(400).send('Password must be at least 6 characters long.');
  }
  if (data.password !== data.confirmPassword) {
    res.status(400).send('Passwords do not match.');
  }

  //if no role is passed in, default to basic user permission
  if (!data.role) {
    data.role = 'user';
  }

  // Hash password
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(data.password, salt);

  const newUser = {
    email: data.email,
    username: data.username,
    password: hash,
    role: data.role
  }

  // try to create a new user with the validate information
  User.create(newUser)
  .then((result) => {
    console.log(result);
    res.status(200).send(`User: \"${data.username}\" registered with email: \"${data.email}\"`);
  })
  .catch((err) => {
    console.log(err);
    // determine whether the email or username is already taken
    let duplicatedValue = Object.keys(err.keyValue);
    res.status(500).send(`A user already exists with that ${duplicatedValue[0]}`);
  })
})

module.exports = router;