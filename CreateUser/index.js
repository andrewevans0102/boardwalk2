const CosmosClient = require("@azure/cosmos").CosmosClient;

module.exports = async function (context, req) {
	context.log("JavaScript HTTP trigger function processed a request.");

	const endpoint = "<YOUR_COSMOS_DB_ENDPOINT_HERE>";
	const key = "<YOUR_KEY_GOES_HERE>";
	const databaseId = "<YOUR_DATABASE_NAME>";
	const containerId = "<YOUR_CONTAINER_NAME>";
	const client = new CosmosClient({ endpoint, key });
	const database = client.database(databaseId);
	const container = database.container(containerId);

	const spotId = Date.now();
	const newItem = {
		id: spotId.toString(),
		name: req.body.name,
		tier: req.body.tier,
	};
	try {
		const { resource: createdItem } = await container.items.create(newItem);
		context.res = {
			body: createdItem,
			status: 200,
		};
	} catch (error) {
		context.res = {
			body: error,
			status: 500,
		};
	}
};
