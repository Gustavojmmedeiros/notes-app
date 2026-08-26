# Notes App

> Full-stack note-taking application built with a **microservices architecture**, featuring a React frontend, a Node.js gateway and a Java Spring Boot backend with PostgreSQL.

Notes App lets you organize your thoughts, ideas, reminders, so you can access it later in one place. Create notes, attach tags to them, so to make your workspace organized.

**This is a personal project, for personal edification purposes only. Be nice.**

## ✨ Key Features
- **Create, edit and delete notes** with title, content and associated tags
- **Filter notes** by title, content and tags
- **Batch operations** - update and delete multiple notes at once
- **Real-time UI updates** with React Context API
- **Type-safe** - TypeScript across frontend and gateway
- **Dockerized** - run everything with a few commands

## 📚 Table of Contents

- [Quick Start](#-quick-start)
- [Prerequisites](#-prerequisites)
- [Running with Docker](#-running-with-docker)
- [Running Locally](#-running-locally)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)

## 🚀 Quick Start

Interested in run it? Clone the repository and run:

```bash
docker compose up -d
```

### Prerequisites
- Docker & Docker Compose
- Node.js (local development)
- Java 21 (local development)

### Running with Docker (Recommended)
> Remember to clone the repository inside the parent folder you want to work in, for example to work with notes-app inside the directory "Projects" (C:\Users\YourName\Documents\Projects or /home/YourName/Documents/Projects), go to that directory and do the the commands below:


```
# Clone the repository
git clone https://github.com/your-username/notes-app.git
cd notes-app

# Start all services
docker compose up -d

# View logs (f to follow, n to to show lines from the end)
docker compose logs -f -n <n>

# Stop all services
docker compose down

# Stop single service
docker stop <service>
```

<!-- Access the application at http://localhost:3001 (by default) -->

## Running Locally

### Backend (Java + Spring Boot)
```
cd backend-java
./mvnw spring-boot:run
```
Runs on http://localhost:8080 (by default)

### Gateway (Node.js + TypeScript)
```
cd gateway-node
npm install
npm run dev
```
Runs on http://localhost:3000 (by default)

### Frontend (React + TypeScript)
```
cd frontend-react
npm install
npm run start
```
Runs on http://localhost:3001 (by default)

### Database (PostgreSQL)
```
docker run -d \
  --name notesapp-postgres \
  -e POSTGRES_USER=notesappuser \
  -e POSTGRES_PASSWORD=notesapppass \
  -e POSTGRES_DB=notesappdb \
  -p 5432:5432 \
  postgres:15
```

## 📁 Project Structure

```
notes-app/
├── backend-java/                               # Spring Boot API
│   ├── src/
│   │   ├── main/java/com/notes/backend_java/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── model/
│   │   │   └── dto/
│   │   └── resources/
│   └── pom.xml
├── gateway-node/                               # Node.js + TypeScript Gateway
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── tsconfig.json
├── frontend-react/                             # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── types/
│   │   └── styles/
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

## API Endpoint

### Notes

| Method | Endpoint     | Description           |
|--------|--------------|-----------------------|
| GET    | `/notes`     | List all notes        |
| GET    | `/notes/:id` | Get a single note     |
| POST   | `/notes`     | Create a note         |
| PATCH  | `/notes/:id` | Update a single note  |
| PATCH  | `/notes`     | Update multiple notes |
| DELETE | `/notes/:id` | Delete a single notes |
| DELETE | `/notes`     | Delete multiple notes |

### Notes (Filters) TDB

| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| GET    | `/notes?title=...$tag=...` | Filter notes by title and\or tag |

### Tags TBD

| Method | Endpoint    | Description   |
|--------|-------------|---------------|
| GET    | `/tags`     | List all tags |
| POST   | `/tags`     | Create a tag  |
| DELETE | `/tags/:id` | Delete a tag  |
