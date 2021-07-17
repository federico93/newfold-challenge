
# newfold-challenge
REST API solution for the given challenge

Built with TDD and DDD, in nodejs using express

Main file is located at src/app.js

## Requirements
- MySQL database with table "products":
```sql
CREATE TABLE `products` (
  `customer_id` varchar(32) NOT NULL,
  `product_name` varchar(32) NOT NULL,
  `domain` varchar(32) NOT NULL,
  `start_date` date NOT NULL,
  `duration_months` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `products`
  ADD PRIMARY KEY (`customer_id`,`product_name`,`domain`);
COMMIT;
``` 
- Node.js (developed with v14)
## Configuration files
Create a .env file in root dir
```bash
# DB connection info
MYSQL_DATABASE=newfold
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_LOCAL_HOST=localhost
MYSQL_LOCAL_PORT=3309
# Local port to run the app
APP_PORT=3000
```
## Installation
```
npm install
npm start
```

## Testing (coverage near 100%)
```
npm test
```

## Endpoints
* ### POST /v1/products (creates a product)
  JSON schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "type": "object",
  "title": "CreateProductSchema",
  "required": [
    "customer_id",
    "product_name",
    "domain",
    "start_date",
    "duration_months"
  ],
  "properties": {
    "customer_id": { "type": "string" },
    "product_name": { "type": "string" },
    "domain": { "type": "string" },
    "start_date": { "type": "string", "format": "date" },
    "duration_months": { "type": "integer" }
  }
}
```
Example request body
```json
{
      "product_name": "hosting",
      "customer_id": "Cust3456",
      "domain": "abcdefg.net",
      "start_date": "2022-03-28",
      "duration_months": 6
}
```

Example cURL
```bash
curl --location --request POST 'http://localhost:3000/v1/products' \
--header 'Content-Type: application/json' \
--data-raw '{
"product_name": "hosting",
"customer_id": "Cust3456",
"domain": "abcdefg.net",
"start_date": "2022-03-28",
"duration_months": 6
}'
```
* ### DELETE /v1/products (deletes a product)
  JSON schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "type": "object",
  "title": "CreateProductSchema",
  "required": [
    "customer_id",
    "product_name",
    "domain"
  ],
  "properties": {
    "customer_id": { "type": "string" },
    "product_name": { "type": "string" },
    "domain": { "type": "string" }
  }
}
```
Example request body
```json
{
"customer_id":  "Cust123",
"product_name":  "domain",
"domain":  "xyzzy.com"
}
```
Example cURL
```bash
curl --location --request DELETE 'http://localhost:3000/v1/products' \
--header 'Content-Type: application/json' \
--data-raw '{
"customer_id": "Cust123",
"product_name": "domain",
"domain": "xyzzy.com"
}'
```
* ### GET /v1/scheduled-emails (lists scheduled emails)
Example cURL
```bash
curl --location --request GET 'http://localhost:3000/v1/scheduled-emails'
```