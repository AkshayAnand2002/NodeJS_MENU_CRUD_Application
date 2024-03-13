const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
// const Person = require("./models/Person");
// const MenuItem = require("./models/MenuItem");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/aks", (req, res) => {
  res.send("Namaste!!!");
});

app.get("/idli", (req, res) => {
  var customized_idli = {
    name: "sambhar idli",
    size: "5cm diameter",
    is_sambhar: true,
    is_chutney: false,
  };
  res.send(customized_idli);
});
//----------------------------------xxxxxxxxxxxxxxxxxxxxxx----------------------
//POST route to add a person
// app.post("/person", async (req, res) => {
//   try {
//     // res.send("Data is saved.");
//     const data = req.body; //assuming the request body contains the person data
//     //create a new person document using Mongoose model
//     const newPerson = new Person(data);
//     // newPerson.name = data.name;
//     // newPerson.age = data.age;
//     // newPerson.mobile = data.mobile;
//     // newPerson.email = data.email;
//     // newPerson.address = data.address;

//     //Save the newPerson to database
//     const response = await newPerson.save();
//     console.log("data saved");
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//GET method to get the person
// app.get("/person", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log("data fetched");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
//------------xxxxxxxxxxxxxxxxxxxxxx-------------------------------
//---------------------------------------------------------------------
// app.post("/menu", async (req, res) => {
//   try {
//     // res.send("Data is saved.");
//     const data = req.body; //assuming the request body contains the person data
//     //create a new person document using Mongoose model
//     const newMenu = new MenuItem(data);
//     const response = await newMenu.save();
//     console.log("data saved");
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// //GET method to get the person
// app.get("/menu", async (req, res) => {
//   try {
//     const data = await MenuItem.find();
//     console.log("data fetched");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/person/:workType", async (req, res) => {
//   try {
//     const workType = req.params.workType; //extract the work type from url parameter
//     if (workType == "chef" || workType == "manager" || workType == "waiter") {
//       const response = await Person.find({ work: workType });
//       console.log("Response Fetched");
//       res.status(200).json(response);
//     } else {
//       res.status(404).json({ error: "Invalid workType" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//IMPORT THE ROUTER FILES
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
//use the routes
app.use("/person", personRoutes);
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log("LISTENING ON PORT 3000");
});
