require("dotenv").config({ path: "../.env" });
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECT;
console.log("URI - ", uri);
const client = new MongoClient(uri);

async function deleteRecords(collection) {
  try {
    await client.connect();

    const database = client.db();
    const collectionFound = database.collection(collection);
    const result = await collectionFound.deleteMany({});
    if (result.deletedCount > 0) {
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

deleteRecords("whitelistToken");

module.exports = {
  deleteRecords,
};
