# Vane — Environmental Operations & Decision Agent

> Vane is an A-tier, serverless environmental intelligence and decision-making agent designed for modern campuses. Moving beyond passive data visualization, Vane ingests raw telemetry, detects critical anomalies using deterministic baseline drift calculations, and prescribes budget-aware interventions via an integrated AI kernel.

---

## 🏛️ Architecture & Tech Stack

Vane utilizes a zero-hardware, serverless-ready architecture designed for AWS deployment.

* **Frontend:** React + Vite, styled using an enterprise brutalist UI/UX system derived from Google Stitch.
* **Backend:** Python FastAPI + Pandas, wrapped with **Mangum** for native AWS Lambda compatibility.
* **AI Engine:** Google Gemini API (`gemini-3.8-flash`), optimized for multi-step agentic reasoning and telemetry analysis.
* **Target Cloud Infrastructure:** Amazon API Gateway $\rightarrow$ AWS Lambda $\rightarrow$ Amazon S3.

---

## ✨ Key Features

1. **Dynamic CSV Telemetry Ingestion:** Real-time processing of facility logs with zero hardcoded stubs. Automatically calculates spikes, critical anomalies, and total campus consumption.
2. **Prescriptive AI Agent (Vane Kernel):** Context-aware conversational intelligence powered by Gemini 3.8 Flash, translating raw data anomalies into exact operational mitigation steps.
3. **Interactive Impact Simulator:** Real-time slider calculations showing target reduction, estimated kWh saved, financial opex recovered, and CO₂ offset.
4. **Data-Dense Enterprise UI:** Built with clean lines, high-contrast borders, and custom Recharts visualizers, avoiding generic AI template styling.

---

## 🚀 Getting Started Locally

### Prerequisites

* Node.js & npm installed
* Python 3.9+ installed

### 1. Backend Setup (`/vane/backend`)

Navigate to the backend directory and set up your virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Or venv\Scripts\Activate on Windows
pip install -r requirements.txt

```

Create a `.env` file in the backend root and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here

```

Run the FastAPI development server:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000

```

### 2. Frontend Setup (`/vane/frontend`)

Navigate to the frontend directory and start the local development server:

```bash
cd frontend
npm install
npm run dev

```

Open `http://localhost:5173` in your browser to interact with the dashboard.

---

