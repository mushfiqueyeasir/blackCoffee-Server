const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { data } = require("./jsondata");

const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//MOngoDB connections

const client = new MongoClient(
  "mongodb+srv://blackCoffee:qO4oTk7soAmY991F@cluster0.emmtc.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  }
);

async function run() {
  try {
    const visualCollection = client
      .db("BlackCoffeeServer")
      .collection("visual");

    //read all data
    app.get("/visual", async (req, res) => {
      const query = {};
      const cursor = visualCollection.find(query);
      const visual = await cursor.toArray();
      res.send(visual);
    });

    //read specific data
    app.get("/visual/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const visual = await visualCollection.findOne(query);
      res.send(visual);
    });

    //Add Service
    app.post("/visual", async (req, res) => {
      const result = await visualCollection.insertMany(data);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

//
app.get("/", (req, res) => {
  res.send("Running Data Autocare Server");
});

app.listen(port, () => {
  console.log("Listening to port: ", port);
});

app.get("/hero", (req, res) => {
  res.send("Hero meets hero ku");
});
