require('./models/User');//created objects
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

    const mongoUri =
    // mongodb+srv://<username>:<password>@cluster0-pz16w.mongodb.net/<dbname>?retryWrites=true&w=majority
      //'mongodb+srv://p00gz:JyKbVf7l6ATUk54h@emaily-uwsj6.mongodb.net/natasha?retryWrites=true';
      'mongodb+srv://natalia:mW48H4vJK6tHQENz@cluster0-pz16w.mongodb.net/natasha?retryWrites=true&w=majority';
  mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
