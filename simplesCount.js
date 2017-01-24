var DB = require('./javascripts/db');

function count (MongoDBURI, collectionName) {

	var database = new DB;

	database.connect(MongoDBURI)
	.then(
		function() {
			// Make the database call and pass the returned promise to the next stage
			return database.countDocuments(collectionName);
		},
		function(err) {
			console.log("Failed to connect to the database: " + err);
			return 0;	// This will automatically be converted into a resolved promise for the
						// next .then in the chain
		})
	// The following `.then` clause uses the promise returned by the previous one.
	.then(
		function(count) {
			console.log(count + " documents");
			database.close();
		},
		function(err) {
			console.log("Failed to count the documents: " + err);
			database.close();
		})
}

count("mongodb://localhost:27017/mongopop", "simples");
