const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://dbuser:dbuser@cluster0.ggwyukx.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const campaignSchema = new mongoose.Schema({
  name: String,
  keywords: String,
  bidAmount: Number,
  campaignFund: Number,
  status: String,
  town: String,
  radius: Number,
});

const Campaign = mongoose.model("Campaign", campaignSchema);

app.get("/api/campaigns", async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});

app.get("/campaigns/:id", async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  res.json(campaign);
});

app.post("/campaigns", async (req, res) => {
  const newCampaign = new Campaign(req.body);
  await newCampaign.save();
  res.json(newCampaign);
});

app.put("/campaigns/:id", async (req, res) => {
  await Campaign.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

app.delete("/campaigns/:id", async (req, res) => {
  await Campaign.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
