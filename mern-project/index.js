const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Define a Mongoose Schema
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

const Data = mongoose.model('Data', dataSchema);

// API endpoints
app.post('/api/data', (req, res) => {
  const newData = new Data(req.body);
  newData.save()
    .then(() => res.json('Data added successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get("/",async(req,res)=>{
    res.send("hello world")
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
