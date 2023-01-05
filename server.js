const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const hbs = require("hbs");
const path = require("path");
const cors = require("cors");

const vendorRoute = require("./routes/vendor");

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates"));

mongoose
  .connect(
    "mongodb+srv://Nesara:Nesara@cluster0.tmdwswk.mongodb.net/vendor?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected Successfully!"))
  .catch((err) => console.log(err));

app.use("/vendorForm", vendorRoute);

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// app.post("/vendorForm", async (req, res) => {
//     try {
//         // await
//         const newVendor = await new vendor(req.body).save()
//         res.json(newVendor)

//         console.log(JSON.stringify(req.body, null, 2))
//     } catch (error) {
//         console.log(error)
//     }
// })

app.listen(3005, () => console.log("Server running on 3005"));
