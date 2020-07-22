const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

let bodyParser = require('body-parser');
app.use(bodyParser.json());

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', error => {
  console.log('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('beforeExit', () => {
  app.close((err) => {
    if (err) console.error(JSON.stringify(err), err.stack);
  });
});

app.use('/project', require('./routes/project.routes.js'));
app.use('/', (req, res) => { res.redirect('/project'); });

// set port, listen for requests
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Server is running on port ' + PORT);
  }
});

module.exports = server;
