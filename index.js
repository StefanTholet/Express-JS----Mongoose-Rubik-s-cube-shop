const express = require('express');
const app = express();

const routes = require ('./config/routes');

const expressConfig = require('./config/express')(app);
const mongooseConfig = require('./config/mongoose')(app);

app.use(routes);

app.listen(3000, () => console.log(`Server is running on port 3000`)) 