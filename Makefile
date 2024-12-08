PYTHON := $(shell command -v python3 || command -v python)

install-backend:
	cd backend && $(PYTHON) -m venv .venv && . .venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt && cp .env.example .env

install-frontend:
	cd frontend && npm i

install: install-backend install-frontend

postgres-start:
	docker compose -f ./backend/docker-compose.yml up -d

postgres-stop:
	docker compose -f ./backend/docker-compose.yml down

seed-db:
	cd ./backend && . .venv/bin/activate && python -m app.seeder

api-start:
	cd ./backend && . .venv/bin/activate && uvicorn app.main:app --reload

web-start:
	cd ./frontend && npm run dev