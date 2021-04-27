require("dotenv").config();
const debug = require("debug")("DHE:main");
require("./db");

const app = require("./server");
