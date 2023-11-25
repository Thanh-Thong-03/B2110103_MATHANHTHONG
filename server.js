const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");

async function startServer() {
  try {
    /*mongoose.set("useCreateIndex", true);
    mongoose
      .connect(config.db.uri, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Successfully connected to the database");
      })
      .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
      });*/

      main().catch(err => console.log(err));

      async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/clothesstore')
        .then(() => {
            console.log("Successfully connected to the database");
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
      }
      
    const Port = config.app.port;
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}.`);
    });
  } catch (error) {
    console.log("Cannot connect to the database!", error);
    process.exit();
  }
}

startServer();
