require("dotenv").config();
const debug = require("debug")("DHA:db");
const chalk = require("chalk");
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      debug(chalk.red.bold("Ha ocurrido un error al conectar a MongoDB:"));
      debug(chalk.red(err));
      process.exit(1);
    }
    debug(chalk.yellow("Conectado a MongoDB"));
  }
);
