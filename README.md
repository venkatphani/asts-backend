add the following in `.env` file -
`POSTGRES_PASSWORD=password`
`POSTGRES_USER=docker`
`POSTGRES_DB=test`
Run Postgress using this command -
`docker-compose -f docker-compose.postgresql.yml up`
Start the server -
`npm run serve`
