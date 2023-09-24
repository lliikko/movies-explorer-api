const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const error = require('./middlewares/error');
const routes = require('./routes');

const limiter = require('./utils/limiter');
const { host, port } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = port } = process.env;
const app = express();
app.use(helmet());

// подключаемся к серверу mongo
mongoose.connect(host, {
  useNewUrlParser: true,
});
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({ origin: 'https://angelikayang.nomoreparties.co', credentials: true }));

app.use(requestLogger);
app.use(limiter);

app.use('/', routes);

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
