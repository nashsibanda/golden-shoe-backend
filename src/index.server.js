const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const app = express();

// Routes
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const styleRoutes = require("./routes/style.routes");
const cartRoutes = require("./routes/cart.routes");
const stockRoutes = require("./routes/stock.routes");

// App setup
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  });

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/styles", styleRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/stock", stockRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
