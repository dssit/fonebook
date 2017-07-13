const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// For parsing application/json
app.use(bodyParser.json());

// Set up routes
const statusRoute = require('./routes/status');
const workgroupsRoute = require('./routes/workgroups');

app.use('/status', statusRoute);
app.use('/workgroups', workgroupsRoute);

// Set up error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;

  next(err);
});

app.use((err, req, res) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Run server
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});