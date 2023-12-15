require("dotenv").config({ path: "../backend/.env" });
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECT;
const client = new MongoClient(uri);
const moment = require("moment");

/* GET ALL COCKTAILS */
async function getAllCocktails() {
  try {
    await client.connect();

    const result = await client
      .db()
      .collection(process.env.MONGODB_COLLECTION)
      .find({})
      .toArray();

    if (result) {
      return result;
    } else {
      console.log(`No cocktails found`);
      return "Cocktails not found";
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

/* GET EXPIRES TOKEN */
async function getExpiredToken() {
  try {
    await client.connect();

    const database = client.db();
    const collectionFound = database.collection("whitelistToken");
    const query = {
      expire: { $lt: moment() },
    };

    // Delete documents that match the condition
    const result = await collectionFound.deleteMany(query);
    if (result.deletedCount > 0) {
      console.log("DELETED RESULT ", result);
      return true;
    } else {
      console.log("No document found");
      return false;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

/* CREATE DOCUMENT */
async function createDocument(collection, document) {
  try {
    await client.connect();

    const database = client.db();
    const collectionFound = database.collection(collection);
    const documentToInsert = document;
    const result = await collectionFound.insertOne(documentToInsert);
    if (result) {
      console.log(`Document inserted with _id: ${result}`);
      return result;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

/* GET DOCUMENT */
async function getDocument(collection, field, value) {
  try {
    await client.connect();

    const database = client.db();
    const collectionFound = database.collection(collection);
    const query = { [field]: value };
    const cursor = collectionFound.find(query);
    const result = await cursor.toArray();
    if (result.length > 0) {
      console.log(`Document retrieved: ${result}`);
      return result;
    } else {
      console.log("No document found");
      return false;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

/* DELETE DOCUMENT */
async function deleteDocument(collection, field, value) {
  try {
    await client.connect();

    const database = client.db();
    const collectionFound = database.collection(collection);
    const query = { [field]: value };
    const result = await collectionFound.deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Document deleted successfully");
      return true;
    } else {
      console.log("Document not found");
      return false;
    }
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}
module.exports = {
  getAllCocktails,
  createDocument,
  getDocument,
  deleteDocument,
  getExpiredToken,
};
