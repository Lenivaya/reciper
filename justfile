default:
  just --list

format-backend:
  dotnet-csharpier reciper-backend

backend-graphql-develop $DOTNET_WATCH_SUPPRESS_LAUNCH_BROWSER="1":
  dotnet watch run --project reciper-backend/Reciper.GraphQL

backend-graphql-schema:
  dotnet run --project reciper-backend/Reciper.GraphQL -- schema export --output schema.graphql
  cp reciper-backend/Reciper.GraphQL/schema.graphql reciper-frontend/schema.graphql

sync-schema: backend-graphql-schema 



