# Vane — Enterprise Environmental Operations Agent

> Vane is a production-grade, serverless environmental intelligence and decision-making agent designed for modern campuses. Moving beyond passive data visualization, Vane ingests raw telemetry, detects critical anomalies using deterministic baseline drift calculations, and prescribes budget-aware interventions via an integrated AI kernel.

---

## 🏛️ Architecture & Tech Stack

Vane utilizes a zero-hardware, serverless-ready architecture designed for AWS deployment, featuring strict type validation and stateful memory.

* **Frontend:** React + Vite, styled using an enterprise brutalist UI/UX system derived from Google Stitch, featuring dynamic state management and toast notifications.
* **Backend:** Python FastAPI + Pandas, fortified with **Pydantic** for strict data validation and wrapped with **Mangum** for native AWS Lambda compatibility.
* **AI Engine:** Google Gemini API (`gemini-3.8-flash`), optimized for multi-step agentic reasoning, temporal insight injection, and budget-ruthless ROI logic.
* **Target Cloud Infrastructure:** Amazon API Gateway -> AWS Lambda -> Amazon S3 / DynamoDB (integrated via `boto3`).

---

## ✨ Key Features

1. **Dynamic CSV Telemetry Ingestion:** Real-time processing of facility logs with **zero hardcoded metrics**. Vane calculates moving 24-hour baseline averages and dynamically generates AQI, Water, and Waste KPIs based on energy anomaly severity.
2. **Prescriptive AI Agent (Vane Kernel):** Context-aware conversational intelligence powered by Gemini 3.8 Flash. The agent pinpoints temporal anomalies (e.g., evening HVAC loads) and prescribes exact operational mitigation steps.
3. **Budget-Aware ROI Logic:** If an operator specifies a budget limit, Vane automatically disqualifies interventions that exceed it (like Rooftop Solar) and recalculates priority rankings.
4. **Interactive Impact Simulator:** Real-time slider calculations performing actual math against the ingested campus load to show estimated kWh saved, financial OPEX recovered, and CO₂ offset.

---

## 🏆 AWS Hackathon Compliance

This project fulfills the AWS Open Source requirements by natively integrating:
* **`boto3` (AWS SDK for Python):** Configured for telemetry log archival to Amazon S3 and event logging.
* **AWS Serverless Application Model (SAM) & Mangum:** The FastAPI backend is wrapped as an AWS Lambda handler, ready for direct deployment via API Gateway.

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

### 2. Generate Synthetic Telemetry Data

Vane requires mathematical baseline drift to trigger anomalies. We have included a Python data generator to simulate realistic campus loads.

While in your active backend terminal, run:

```bash
python generate_telemetry.py

```

*(This will generate 3 CSV files, including `telemetry_demo_block_c_spike.csv`, which triggers a realistic evening HVAC anomaly for demo purposes).*

### 3. Frontend Setup (`/vane/frontend`)

Navigate to the frontend directory and start the local development server:

```bash
cd frontend
npm install
npm run dev

```

Open `http://localhost:5173` in your browser. Upload the generated `telemetry_demo_block_c_spike.csv` file to instantly initialize the Vane Kernel.

---

