const routes = require('./routes/routes');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/", routes);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "./risk_profile")));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});