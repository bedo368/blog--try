const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
app.use(bodyParser.json());
const schema = require("./modules/schema/qraphqlschema")
const resolver = require("./modules/resolovers/resolovers")

const isAuth = require("./middleware/is-auth")

app.use(isAuth)
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: resolver,
  })
);

mongoose
  .connect(
    "mongodb+srv://bedo:Aa00110022@cluster0.u2zoo.mongodb.net/blogpost",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected to data base"))
  .catch((err) => console.log(err));
mongoose.set("useCreateIndex", true);

app.listen(5000);
