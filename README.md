# boardwalk

This is the backend for the project [sandbar](https://www.github.com/andrewevans0102/sandbar2). This accompanys Andrew and Ram's talk [Configuration Based Development Approach - Andrew Evans & Ram Ramkumar w/CapTech](https://www.meetup.com/rva-js/events/szjphrybclbgb/).

These functions can be run locally or deployed in your own Azure account. We built these functions with a MacBook and using the VSCode Extension for [Azure Functions](https://github.com/Microsoft/vscode-azurefunctions).

Each function reads in the Database Credentials and then makes the associated Create, Read, Update, or Delete (CRUD) event.

To run this yourself, you'll need to create an Azure Account and Cosmos DB project. You'll then need to edit the first few lines of each Azure Function like that identify your Database and the Container name:

```js
context.log("JavaScript HTTP trigger function processed a request.");

const endpoint = "<YOUR_COSMOS_DB_ENDPOINT_HERE>";
const key = "<YOUR_KEY_GOES_HERE>";
const databaseId = "<YOUR_DATABASE_NAME>";
const containerId = "<YOUR_CONTAINER_NAME>";
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);
```

## Request

Create Request

- Method = POST
- `<YOUR_BASE_URL_HERE>/api/CreateRequest`
- Sample Body (note `fields` can be anything)

```json
{
	"spotId": "12345",
	"spotName": "First Spot",
	"numberAllowed": "20",
	"userName": "Harry Potter",
	"requestDay": "07/11/2020",
	"fields": {
		"Umbrella": true,
		"Chairs": true
	}
}
```

Select Request (selects all)

- Method = GET
- `<YOUR_BASE_URL_HERE>/api/SelectRequest`

Delete Request

- Method = DELETE
- `<YOUR_BASE_URL_HERE>/api/DeleteRequest?id=0` (note the query string id passed in)

## Spot

Create Spot

- Method = POST
- `<YOUR_BASE_URL_HERE>/api/CreateSpot`
- Sample Body (note `fields` can be anything)

```json
{
	"name": "Good Spot",
	"numberAllowed": "20",
	"description": "Spot that is good",
	"imageURL": "./good_image.jpg",
	"fields": {
		"Umbrella": true,
		"Chairs": true
	}
}
```

Select Spot (selects all)

- Method = GET
- `<YOUR_BASE_URL_HERE>/api/SelectSpot`

Delete Spot

- Method = DELETE
- `<YOUR_BASE_URL_HERE>/api/DeleteSpot?id="0"` (note id value as query string)

Update Spot

- Method = POST
- `<YOUR_BASE_URL_HERE>/api/UpdateSpot`
- Sample Body (calls to this only update `selected` and `fields`)

```json
{
	"id": "12345",
	"selected": true,
	"description": "good spot",
	"imageURL": "./good_image.png",
	"fields": {
		"Umbrella": true,
		"Chairs": true
	}
}
```

## User

Create User

- Method = POST
- `<YOUR_BASE_URL_HERE>/api/CreateUser`
- Sample Body

```json
{
	"name": "Daenerys Targaryen"
}
```

Select User (select all)

- Method = GET
- `<YOUR_BASE_URL_HERE>/api/SelectUser`

Login User (dummy endpoint returns 200)

- Method = GET
- `<YOUR_BASE_URL_HERE>/api/LoginUser`

Logout User (dummy endpoint returns 200)

- Method = GET
- `<YOUR_BASE_URL_HERE>/api/LogoutUser`

Update User

- Method = PUT
- `<YOUR_BASE_URL_HERE>/api/UpdateUser?id=12345&tier=premium` (note query string id and tier values)
