require("dotenv").config();
const debug = require("debug")("DHA:main");
require("./db");

const app = require("./server");
