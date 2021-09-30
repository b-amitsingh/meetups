// POST /api/new-meetup

import { MongoClient } from "mongodb";

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://new-user:VlnpYQ7kJJeAydyj@cluster0.tfdsy.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url);
// The database to use
const dbName = "test";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      await client.connect();
      console.log("Connected correctly to server");
      const db = client.db(dbName);

      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne(data);
      // Find one document
      // Print to the console

      console.log(result);
      res.status(201).json({ message: "meetup inserted" });
    } catch (err) {
      console.log(err.stack);
    } finally {
      await client.close();
    }
  }
}

export default handler;
