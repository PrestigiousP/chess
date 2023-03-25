//include express module or package
const express = require("express");
//create instance of express
const app = express();

app.use(express.static("views"));

app.listen(4000, () => console.log("Listening on port 4000!"));
