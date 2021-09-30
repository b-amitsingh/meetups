import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const url =
    "mongodb+srv://new-user:VlnpYQ7kJJeAydyj@cluster0.tfdsy.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  if (req.method === "POST") {
    const data = req.body;

    await client.connect();
    const db = client.db("test");
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup inserted" });
  }
};

export default handler;
