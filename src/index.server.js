const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('dotenv');
env.config();
const app = express();

// Routes
const authRoutes = require("./routes/auth.routes");

// App setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("Connected to MongoDB!")
});

app.use(express.json());
app.use(bodyParser());
app.use('/api', authRoutes);




app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
});