const express = require("express");
const app = express();
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT;
require("./config/mongoose.config");
const cookieParser = require('cookie-parser');
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

require("./routes/user.route")(app);
require('./routes/flower.route')(app);
require('./routes/order.route')(app);
require('./routes/admin.route')(app);
app.listen(port, () => console.log(`Listening on port: ${port}`) )