const express = require('express');
const router = express.Router();

const fs = require("fs");
const path = require("path");

let GetDummyData = async (req, res) => {
    // Construct the file path using path.join
  const filePath = path.join(__dirname, "MOCK_DATA.json");

    console.log(filePath);
    
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the JSON file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return res.status(500).send("Error reading JSON file");
      }

      // Parse the JSON data
      const jsonData = JSON.parse(data);

      // Take only the first 50 items
      const slicedData = jsonData.slice(0, 50);

      // Send the sliced JSON data as the response
      res.json(slicedData);
    });
  } else {
    res.status(404).send("JSON file not found");
  }
}

let PostAdviser = async (req, res) => {
  // Construct the file path using path.join
  const filePath = path.join(__dirname, "MOCK_DATA.json");

    console.log(filePath);
    
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the JSON file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return res.status(500).send("Error reading JSON file");
      }

      // Parse the JSON data
      const jsonData = JSON.parse(data);

      jsonData.push(req.body);

      for (let i = req.body.id; i < jsonData.length; i++) {
        jsonData[i].id + 1;
      }
    
      // Sort data by the 'id' property
      jsonData.sort((a, b) => a.id - b.id);

      const updatedJson = JSON.stringify(jsonData, null, 2); // Optional: null and 2 for formatting


      fs.writeFile(filePath, updatedJson, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to JSON file:', err);
          return;
        }
        res.status(201).send('JSON file updated successfully');
        
      });


      // Send the sliced JSON data as the response
      // res.json(slicedData);
    });
  } else {
    res.status(404).send("JSON file not found");
  }

}

router.get("/", GetDummyData);
router.post("/Add", PostAdviser);
// router.get("/Update", GetDummyData);
router.delete("/Delete/:id", GetDummyData);


module.exports = router;