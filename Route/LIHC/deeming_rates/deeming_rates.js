const Express = require("express");
const MyRouter = Express.Router();

const deeming_ratesDetails = require("../../../Model/LIHC/deeming_rates/deeming_rates");
const deeming_ratesSchema = require("../../../schema/LIHC/deeming_rates/deeming_rates");


// const bcrypt = require('bcrypt');

MyRouter.get("/", async (req, res) => {
  const C = await deeming_ratesDetails.find();
  try {
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.post("/Add", async (req, res) => {
  const Newdeeming_rates = req.body;
  const { error } = deeming_ratesSchema(Newdeeming_rates);
  // if (error) return res.status(400).send(error.details[0].message);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } 
  else {

    let Adddeeming_rates = new deeming_ratesDetails(Newdeeming_rates);
    Adddeeming_rates = await Adddeeming_rates.save();
    res.send(Adddeeming_rates);
  }
});

MyRouter.patch("/Update/:id", async (req, res) => {
  const Updatedeeming_rates = await deeming_ratesDetails.findOne({ _id: req.params.id });
  
    Updatedeeming_rates.first_deeming_rates = req.body.first_deeming_rates,
    Updatedeeming_rates.balance_deeming_rates = req.body.balance_deeming_rates

  try {
    const C = await Updatedeeming_rates.save();
    res.send(C);
  } catch (err) {
    res.send("Error: " + err);
  }
});

MyRouter.delete("/Delete/:id",async (req, res) => {
  console.log("delete api: ", deeming_ratesDetails)
  const Deletedeeming_rates = deeming_ratesDetails.findOne({ _id: req.params.id });
  console.log(Deletedeeming_rates)
  try {
    const C = await Deletedeeming_rates.deleteOne();
    res.send(C);
  } catch (Error) {
    res.send("Error: " + Error);
  }
});


// dublicate functionility
MyRouter.post("/AddDublicate/:id", async (req, res) => {
  const newDeemingRate = req.body;
  let myID= req.params.id + 1;
  console.log("myID", myID)
  const { error } = deeming_ratesSchema(newDeemingRate);

  if (error) {
    res.status(404).send({ message: error.details[0].message });
  } else {
    try {
      // Provide a custom _id for the new document
      newDeemingRate._id = 'myID';

      // Insert the new document with the custom _id
      const result = await deeming_ratesDetails.insertMany(newDeemingRate);

      console.log('New deeming rate inserted with custom _id:', result.insertedId);
      res.send(newDeemingRate);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});





module.exports = MyRouter;
