# Lumina AI - Restaurant Recommendation System

A premium, AI-powered restaurant recommendation engine built with FastAPI, Next.js, Tailwind CSS, and Groq LLM.

## Tech Stack
- **Backend:** Python, FastAPI, SQLAlchemy, SQLite
- **Frontend:** Next.js (App Router), Tailwind CSS, React
- **AI Integration:** Groq API (Llama 3)
- **Data:** Zomato dataset

## Setup Instructions

### Prerequisites
You will need Node.js and Python installed on your system to run this full-stack application.

### 1. Data Ingestion
1. Open your terminal and navigate to the `backend/` directory.
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the ingestion script to populate your local SQLite database from the downloaded `.parquet` files in the `data/` folder:
   ```bash
   python data_ingestion.py
   ```

### 2. Run the Backend (FastAPI)
1. Add your Groq API key to the `backend/.env` file.
2. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will be running on `http://localhost:8000`.*

### 3. Run the Frontend (Next.js)
1. Open a **new** terminal window and navigate to the `frontend/` directory.
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *Access the beautiful UI at `http://localhost:3000`.*
