default:
  just --list

format-backend:
  dotnet-csharpier reciper-backend

backend-graphql-develop $DOTNET_WATCH_SUPPRESS_LAUNCH_BROWSER="1":
  dotnet watch run --project reciper-backend/Reciper.GraphQL

