const express = require("express");
const { validatePassword } = require("./middlewares");
const { router } = require("./routes");

const app = express();

app.use(express.json());

app.use(router);

app.listen(3000);
