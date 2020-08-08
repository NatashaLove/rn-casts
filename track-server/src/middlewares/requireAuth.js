//this file checks if user has token -gives acces to the app. if no - denies.

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
  //request, response and next function.
  const { authorization } = req.headers;
  // authorization === 'Bearer <token>' - user has to prove his id

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in.' });//401= fprbidden -error
  }

  const token = authorization.replace('Bearer ', '');//extracting the token
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {//payload = object with user id
    if (err) {
      return res.status(401).send({ error: 'You must be logged in.' });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
