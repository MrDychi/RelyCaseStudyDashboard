# Rely Case Study: Historical Space Mission Data Dashboard

## Project Summary
This project is an interactive data dashboard for exploring historical spaceship missions.  
It allows users to analyze mission activity across years, compare companies, examine rocket usage, and evaluate mission success rates through dynamic charts and filters.

The goal of this project is to transform raw mission data into meaningful visual insights using a modern full-stack architecture.


## Tech Stack
### Frontend
- React
- Vite
- Chart.js / react-chartjs-2
- radix-ui
- HTML/CSS

### Backend
- Python
- FastAPI
- Uvicorn

### Infrastructure
- Docker
- Docker Compose


## Requirements
You only need:
- **Docker** installed on your computer
- Node and Python are not needed on your computer.


## How to Run
1. Clone the repository:
```bash
git clone <your-repo-url>
```
2. Navigate into the project directory:
```bash
cd <project-directory>
```
3. Build and start the containers:
```bash
docker compose up --build
```
or 
```bash
docker-compose up --build
```
4. Open your browser and visit:
```bash
http://localhost:5173
```
5. Play around!
- View in full screen for best results

## How to safely close
1. Quit from the terminal
```bash
^+c
```
2. Close the docker containers
```bash
docker compose down
```
or
```bash
docker-compose down
```

## Personal insights
| Visualization | Reasoning |
|---|---|
| Global KPI Data | Quick and easy way to get basic information soon |
| Company KPI Data | Quick and easy way to get more specifc information about the companies you are looking at. You can also see thier activity over the years |
| Most Actice Rockets | I wanted to take the focus away from company and highlight the rockets |
| Rocket Resuability | This is helpful to see how dependable the rockets being made were | 
| Mission Success Rate | I wanted to visualize our improvements in technology over time | 
| Data Table | This is a requirement per project specs |
