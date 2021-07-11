const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
require('dotenv').config()
app.use(bodyParser.json());
const schema = require("./modules/schema/qraphqlschema")
const resolver = require("./modules/resolovers/resolovers")
const cors = require("cors");
const path = require("path");
const isAuth = require("./middleware/is-auth")
app.use(cors());
app.use(isAuth)
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: resolver,
  })
);
app.use((req ,res , next)=>{
  res.setHeader("Access-Control-Allow-Origin" , `*`)
  res.setHeader("Access-Control-Allow-Methods" , `POST,GET,OPTIONS`)
  res.setHeader("Access-Control-Allow-Headers" , `Content-Type ,Authorization`)
  if ( req.method === "OPTIONS"){
    return res.sendStatus(200)
  }
   next()
})
mongoose
  .connect(
    process.env.mongdburl,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected to data base"))
  .catch((err) => console.log(err));
mongoose.set("useCreateIndex", true);

app.listen(5000);
