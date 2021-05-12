const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

app.use(routes.loginRoute, routes.userRoute, routes.productRoute, routes.orderRoute);

app.listen(port, () => console.log(`Blitz listening on port ${port}!`));
