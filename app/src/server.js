const express = require('express');
const consign = require('consign');
const morgan = require('morgan');
const app = express();

consign({ cwd: 'src', verbose: false })
  .include('db.js')
  .then('schemas')
  .into(app);

app.use(morgan('tiny'));

app.get('/logs', (req, res) => {

  const Logs = app.schemas.logs;
  Logs
    .create({ type: 'access_log' })
    .then(() => Logs.find())
    .then(res.json.bind(res));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('App running on port 3000'));
}

module.exports = app;
