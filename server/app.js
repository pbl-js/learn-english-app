import express from "express";
import pkg from "express-graphql";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// import { graphqlHTTP } from "express-graphql";
const { graphqlHTTP } = pkg;
import graphQlSchema from "./graphql/schema/index.js";
import graphQlResolvers from "./graphql/resolvers/index.js";
import isAuth from "./middleware/is-auth.js";

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tm6sw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(
    app.listen(3000, () =>
      console.log(`app listen on port 3000. Database is connected`)
    )
  )
  .catch((err) => console.log(err));
