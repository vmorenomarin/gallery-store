const mongoose = require("mongoose");
const URI = "mongodb://localhost/db_gallery-store";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log(`Database ${db.connection.name} connected.`))
  .catch((error) => console.log(error));
