const PORT = 3001;

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const pino = require("express-pino-logger")();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
