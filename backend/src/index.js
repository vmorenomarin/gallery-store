const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./database");

const app = express();

app.set("port", 4000);

// Middlewares
app.use("/public/", express.static(__dirname + "/storage")); // Create a static folder add a virtual prefix to this directory. With __dirname we create a absolute path to this directory.
app.use(express.urlencoded({ extended: true })); // Parse incoming requests with urlencoded payloads
app.use(express.json()); // Parse incoming requests with JSON payloads

app.use(morgan("dev")); // HTTP request logger
app.use(cors({ origin: "*" })); // Cross-Origin Resource Sharing. Enable share resources between two domains/servers.

app.use("/product", require("./routes/product.route"));
app.use("/user", require("./routes/user.route"));

// Run server
app.listen(app.get("port"), () => {
  console.log("Server listening on port", 4000);
});
