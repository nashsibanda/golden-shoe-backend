const mongoose = require("mongoose");
const faker = require("faker/locale/en_GB");
const env = require("dotenv");
env.config();
const User = require("../models/User");
const { default: slugify } = require("slugify");
const Product = require("../models/Product");
const ProductStyle = require("../models/ProductStyle");
const StockUnit = require("../models/StockUnit");

const globalAmount = 2;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB!");
    const userObjs = [];
    for (let i = 0; i < globalAmount * 10; i++) {
      const userFields = {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: "password",
        contactNumber: faker.phone.phoneNumber(),
      };
      userObjs.push(userFields);
    }
    const productObjs = [];
    const catIds = [
      "601f3899bb20b2854886553b",
      "601f38b1bb20b2854886553c",
      "601f38b5bb20b2854886553d",
      "601f38f1bb20b2854886553e",
      "601f3913bb20b2854886553f",
      "601f391abb20b28548865540",
      "601f3930bb20b28548865541",
      "601f3935bb20b28548865542",
      "601f393bbb20b28548865543",
    ];
    for (let i = 0; i < globalAmount; i++) {
      const productName = faker.commerce.productName();
      const imgFields = [];
      for (let j = 0; j < faker.random.number(4) + 1; j++) {
        imgFields.push({
          url: "/imgs/shoes" + String(faker.random.number(28) + 1) + ".jpg",
        });
      }
      const fields = {
        name: productName,
        slug: slugify(productName, { lower: true }),
        description: faker.commerce.productDescription(),
        images: imgFields,
        categories: [faker.random.arrayElement(catIds)],
        type: "shoe",
      };
      productObjs.push(fields);
    }

    const users = await User.create(userObjs);
    const products = await Product.create(productObjs);

    const styleObjs = [];
    for (let i = 0; i < globalAmount * 4; i++) {
      const imgFields = [];
      for (let j = 0; j < faker.random.number(4) + 1; j++) {
        imgFields.push({
          url:
            "/imgs/shoes" +
            String(faker.random.number(28) + 1) +
            ".jpg",
        });
      }
      const name = faker.commerce.color();
      styleObjs.push({
        name: name,
        slug: slugify(name, { lower: true }),
        productId: faker.random.arrayElement(products)._id,
        images: imgFields
      });
    }

    const styles = await ProductStyle.create(styleObjs);

    const stockObjs = [];
    styles.forEach(style => {
      const gender = faker.random.arrayElement(["women", "men", "children"]);
      for (let i = 4; i < 13; i++) {
        stockObjs.push({
          productId: style.productId,
          styleId: style._id,
          size: {
            size: i,
            gender: gender
          },
          inventory: faker.random.number(100),
          price: faker.commerce.price(6, 100)
        })
      }
    })

    const stockItems = await StockUnit.create(stockObjs);
  });
