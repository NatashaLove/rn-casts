const express = require('express');
const mongoose = require('mongoose');//library
const jwt = require('jsonwebtoken');//library
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {//any time someone want to sign up- this function runs:
  const { email, password } = req.body;

  try {// error handling during sign up
    const user = new User({ email, password });
    await user.save();// to save the instance

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });//creating a token forthe new user
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});

module.exports = router;
