/** @format */

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Simple Node Server is Running");
});

// MiddleWare
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Asraful", email: "iasraful@gmail.com" },
  { id: 2, name: "adaful", email: "aaadful@gmail.com" },
  { id: 3, name: "Ggarafuh", email: "iadfaful@gmail.com" },
  { id: 4, name: "ERasdfl", email: "ert@gmail.com" },
];

// Connected with MONGODB

const uri =
  "mongodb+srv://admin:admin@cluster0.atwliue.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("nodeMongoCrud").collection("users");
    // GET ALL USERS
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // Create USER
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // GET single User

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    // Update User Data

    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      const updateUser = {
        $set: {
          name: user.name,
          email: user.email,
          sectors: user.sectors,
        },
      };
      console.log(user);
      const result = await userCollection.updateOne(filter, updateUser, option);
      res.send(result);
    });
    // Delete User
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Simple Port is Running on server ${port}`);
});
