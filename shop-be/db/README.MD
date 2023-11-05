# DB for shop API

## DB structure
go to init folder
Entry point is initialize.js file
This can create table schema and insert fake data

## Deploy DB
run `npm run deploy` to deploy DB to AWS RDS
create your own `secrets.json`, there is a following structure
```json
{
    "ApiName": "shop-api-db",
    "DefaultRegion": "eu-west-1",
    "Username": "dungeon-master",
    "Password": "P@ssw0rd3!",
    "DBName": "shop_db"
}
```
