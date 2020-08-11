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

	// query to return all items
	const querySpec = {
		query: "SELECT * from c",
	};

	try {
		const { resources: items } = await container.items
			.query(querySpec)
			.fetchAll();

		const response = [];
		items.forEach((item) => {
			response.push({
				id: item.id,
				spotId: item.spotId,
				spotName: item.spotName,
				numberAllowed: item.numberAllowed,
				userName: item.userName,
				imageURL: item.imageURL,
				requestDay: item.requestDay,
				fields: item.fields,
			});
		});

		context.res = {
			body: response,
			status: 200,
		};
	} catch (error) {
		context.res = {
			body: error,
			status: 500,
		};
	}
};
