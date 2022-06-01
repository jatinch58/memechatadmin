const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const allRoutes = require("./routes/routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(allRoutes);
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://sanjay:bcyyZg3uO0o4azHj@cluster0.ehgtk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    console.log("Database connected sucessfully");
  } catch (error) {
    console.log(error);
  }
}
main();

app.listen(4000, () => console.log(`Server listening on port 4000`));
