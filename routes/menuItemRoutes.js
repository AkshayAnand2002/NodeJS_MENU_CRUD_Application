const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");
router.post("/", async (req, res) => {
  try {
    // res.send("Data is saved.");
    const data = req.body; //assuming the request body contains the person data
    //create a new person document using Mongoose model
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
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
    if (workType == "sweet" || workType == "spicy" || workType == "sour") {
      const response = await MenuItem.find({ taste: workType });
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
    const menuItemId = req.params.id; //extract the id from url parameters.
    const updatedMenuItemData = req.body; //updated data for person
    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedMenuItemData,
      {
        new: true, //return the updated document
        runValidators: true, //Run Mongoose validation
      }
    );
    if (!response) {
      return res.status(400).json({ error: "MenuItem Not Found" });
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
    const menuItemId = req.params.id; //extract the id from url parameters.
    //assuming we have a person model
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if (!response) {
      return res.status(400).json({ error: "MenuItem Not Found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "MenuItem deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//export
module.exports = router;
