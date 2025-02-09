default:
  just --list

format-backend:
  dotnet-csharpier reciper-backend

backend-graphql-develop $DOTNET_WATCH_SUPPRESS_LAUNCH_BROWSER="1":
  dotnet watch run --project reciper-backend/Reciper.GraphQL

backend-graphql-schema:
  dotnet run --project reciper-backend/Reciper.GraphQL -- schema export --output schema.graphql
  cp reciper-backend/Reciper.GraphQL/schema.graphql reciper-frontend/schema.graphql

format-frontend:
  cd reciper-frontend && pnpm code:biome:format && pnpm code:format

frontend-grpahql-develop:
  cd reciper-frontend && pnpm dev

format: format-backend format-frontend

sync-schema: backend-graphql-schema



