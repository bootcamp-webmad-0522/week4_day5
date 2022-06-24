require("dotenv/config");

require("./db");

const express = require("express");
const app = express();

require("./config")(app);

app.locals.appTitle = `Bookaria_`;

const index = require("./routes/index.routes");
app.use("/", index);

require("./error-handling")(app);

module.exports = app;