
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const userRoute=require("./routes/user.route")

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(express.static("public"));
// app.set("view engine", "ejs");

app.use("/user", userRoute);

app.get("/", (req, res)=>{
    res.send("this is working")
})

app.all("*", (req, res) => {
    res.send("Error: NO route found.");
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });

//   process.on("unhandledRejection", (error) => {
//     console.log(error.name, error.message);
//     app.close(() => {
//       process.exit(1);
//     });
//   });