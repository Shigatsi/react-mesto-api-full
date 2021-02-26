require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6013e07ac5fd8c1d68ba9d2d', // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };
//   next();
// });
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listen on port ${PORT}`);
});
