# Vehicle Query Engine

Need a new vehicle for your next adventure? Then the **Vehicle Query Engine** is for you! From bikes, to cars, to spaceships -- we have it all! See setup instructions below to get the project up and running.

---

## Prerequisites

Please ensure you have the following installed:

- Docker (for PostgreSQL)
- Python (version 3.8 or above)
- Node.js (version 16 or above) and npm

---

## Setup Instructions

Follow these steps to set up and run the project locally.

---

### 1. Clone the Repository

```bash
git clone https://github.com/jontoye/vehicle-query-engine
cd vehicle-query-engine
```

### 2. Install Dependencies

The following command:

- Sets up a python virtual environment
- Installs backend dependencies with `pip`
- Creates `.env` file using `.env.example` in the backend
- Installs frontend dependencies with `npm`

```bash
make install
```

### 3. Start the PostgreSQL Database

Ensure Docker is running, then start the database using:

```bash
make postgres-start
```

### 4. Seed the Database

Takes the `JSON` data from `backend/app/data` and writes to our postgres db:

```bash
make seed-db
```

### 5. Start the Backend API

```bash
make api-start
```

This will start the FastAPI server, available at `http://127.0.0.1:8000`.

### 6. Start the Frontend

In a new terminal window of this project directory, now start the frontend:

```bash
make web-start
```

This will start the React frontend at `http://127.0.0.1:5173`.

---

## Stopping the Services

To stop running services, use the following commands:

- **Stop the PostgreSQL database**:

  ```bash
  make postgres-stop
  ```

- **API and Frontend**:
  Use `CTRL+C` to stop the backend or frontend processes.

---

## Having problems running any of the Makefile commands? Use these steps to get up and running:

```bash

# API Installation

cd backend

 # setup virtual environment (use python or python3 depending on your machine)
python3 -m venv .venv

# activate virtual environment (on mac/unix)
source .venv/bin/activate

# install deps
pip install --upgrade pip && pip install -r requirements.txt 

# copy env variables 
cp .env.example .env 


# DATABASE and start API

cd backend

# start a postgres server in a docker container
docker compose up -d 

# seed the db (you should already have your virtual env activated)
python -m app.seeder

# Start the API
uvicorn app.main:app --reload


# FRONTEND

cd frontend
npm i
npm run dev


```
---

Feel free to reach out if you have any questions or issues!
