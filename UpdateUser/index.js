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

	try {
		const querySpec = {
			query: "SELECT * from c",
		};

		const { resources: items } = await container.items
			.query(querySpec)
			.fetchAll();

		let savedUser = {};
		for (let i = 0; i < items.length; i++) {
			if (items[i].id === context.req.query.id) {
				savedUser = items[i];
				break;
			}
		}
		if (savedUser === {}) {
			context.res = {
				body: "item was not found",
				status: 500,
			};
		} else {
			savedUser.tier = context.req.query.tier;
			const { resource: updatedItem } = await container
				.item(context.req.query.id, context.req.query.id)
				.replace(savedUser);

			context.res = {
				body: updatedItem,
				status: 200,
			};
		}
	} catch (error) {
		context.log(error);
		context.res = {
			body: error,
			status: 500,
		};
	}
};
