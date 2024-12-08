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

Feel free to reach out if you have any questions or issues!