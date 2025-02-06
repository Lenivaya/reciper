# Reciper

Recipe sharing platform written using ASP.NET with GraphQL API + Next.js frontend.

<!--toc:start-->

- [Reciper](#reciper)
  - [Video demonstration](#video-demonstration)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Development Setup](#development-setup)
  - [Contributing](#contributing)
  - [License](#license)
  <!--toc:end-->

## Video demonstration

<https://github.com/user-attachments/assets/0e857693-faad-4475-bfc3-cb8859616e3b>

<https://github.com/user-attachments/assets/67e5939b-8f54-4dd5-8f37-04627f9ef5ae>

## Features

- Recipes
  - Create and share your favorite recipes
  - Step-by-step cooking instructions
  - Ingredient lists with measurements
  - Recipe categories and difficulty levels
  - Cooking time and serving size information
- Cooks
  - User profiles with avatars
  - Follow your favorite cooks
  - View cook's recipe collections
  - Rating and reputation system
- Tags
  - Organize recipes by cuisine type
  - Dietary restrictions (vegetarian, vegan, gluten-free, etc.)
  - Cooking method tags
  - Seasonal tags
- Multicriterial search
  - Search by ingredients
  - Filter by cooking time
  - Filter by difficulty
- Social Features
  - Recipe ratings and reviews
  - Comments and discussions
  - Save favorite recipes
  - Share recipes

## Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- GraphQL with URQL client
- TailwindCSS
- Radix UI components
- Zustand for state management
- React Hook Form for forms

### Backend

- ASP.NET Core
- Hot Chocolate GraphQL server
- Entity Framework Core
- SQL Server database
- Clean architecture pattern
  - BLL (Business Logic Layer)
  - DAL (Data Access Layer)
  - GraphQL API Layer

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- .NET 8 SDK
- Docker and Docker Compose
- SQL Server instance

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/reciper.git
cd reciper
```

2. Start the database and required services:

```bash
docker-compose -f dev.docker-compose.yml up -d
```

3. Set up the frontend:

Configure environment variables:

```bash
cp reciper-frontend/.env.example reciper-frontend/.env
```

Install dependencies and run the development server:

```bash
cd reciper-frontend
pnpm install
pnpm dev
```

or using justfile:

```bash
just frontend-grpahql-develop
```

4. Set up the backend:

Configure connection string through dotnet user-secrets:

```bash
dotnet user-secrets set ConnectionStrings:DefaultConnection "YourConnectionString"
dotnet user-secrets set ConnectionStrings:Cloudinary "YourCloudinaryConnectionString"
```

```bash
cd reciper-backend
dotnet restore
dotnet run --project Reciper.GraphQL
```

or using justfile:

```bash
just backend-graphql-develop
```

The application will be available at:

- Frontend: <http://localhost:3000>
- GraphQL API: <http://localhost:5158/graphql>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the BSD 3-Clause - see the [LICENSE](./LICENSE) file for details.
