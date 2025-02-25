const express = require("express");
const app = express();
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT;
require("./config/mongoose.config");
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors())
app.listen(port, () => console.log(`Listening on port: ${port}`) )