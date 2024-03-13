const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
router.post("/", async (req, res) => {
  try {
    // res.send("Data is saved.");
    const data = req.body; //assuming the request body contains the person data
    //create a new person document using Mongoose model
    const newPerson = new Person(data);
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.address = data.address;

    //Save the newPerson to database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract the work type from url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid workType" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//UPDATE OPERATION ---- PUT
//id is variable name which server returns so as to identify and get unique id.
//id can be renamed anything such as personid,_id etc.
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from url parameters.
    const updatedPersonData = req.body; //updated data for person
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return the updated document
        runValidators: true, //Run Mongoose validation
      }
    );
    if (!response) {
      return res.status(400).json({ error: "Person Not Found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from url parameters.
    //assuming we have a person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(400).json({ error: "Person Not Found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
