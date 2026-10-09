from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Vane Operations API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-3.8-flash')


@app.post("/api/upload")
@app.post("/api/upload")
async def process_telemetry(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode('utf-8')))

    # Strip spaces and make all headers lowercase to prevent KeyErrors
    df.columns = df.columns.str.strip().str.lower()

    df['timestamp'] = pd.to_datetime(df['timestamp'])

    # Compare the last 3 days against all previous historical data
    cutoff = df['timestamp'].max() - pd.Timedelta(days=3)
    historical_avg = df[df['timestamp'] < cutoff].groupby('building_id')['value'].mean()
    recent_avg = df[df['timestamp'] >= cutoff].groupby('building_id')['value'].mean()

    analysis = []
    highest_spike = 0
    critical_building = "None"
    total_current = recent_avg.sum()

    for building in recent_avg.index:
        base = historical_avg.get(building, recent_avg[building])
        current = recent_avg[building]
        spike_pct = ((current - base) / base) * 100 if base > 0 else 0

        if spike_pct > highest_spike:
            highest_spike = spike_pct
            critical_building = building

        analysis.append({
            "building": building,
            "baseline_kwh": round(base, 2),
            "current_kwh": round(current, 2),
            "spike_pct": round(spike_pct, 1),
            "status": "CRITICAL" if spike_pct > 15 else "NORMAL"
        })

    # Generate time-series data for the React AreaChart based ONLY on the critical anomaly
    chart_data = []
    if critical_building != "None":
        crit_df = df[(df['building_id'] == critical_building) & (df['timestamp'] >= cutoff)].copy()
        crit_df = crit_df.sort_values('timestamp')
        base_val = historical_avg.get(critical_building, 0)

        for _, row in crit_df.iterrows():
            chart_data.append({
                "time": row['timestamp'].strftime('%b %d, %H:%M'),
                "baseline": round(base_val, 2),
                "current": round(row['value'], 2)
            })

    return {
        "status": "success",
        "summary": analysis,
        "chart_data": chart_data,
        "critical_building": critical_building,
        "highest_spike": round(highest_spike, 1),
        "total_kwh": round(total_current, 1)
    }


@app.post("/api/agent")
async def vane_agent(query: str = Form(...), context: str = Form(...)):
    system_instruction = """
    You are Vane, a principal environmental operations AI for enterprise infrastructure.
    Your sole purpose is to convert raw environmental telemetry into high-impact, budget-aware operational decisions.

    CORE DIRECTIVES:
    1. NO FLUFF: Start immediately with the diagnosis or recommendation.
    2. BUDGET RUTHLESSNESS: Strictly disqualify options exceeding the stated budget.
    3. FORMATTING: Format interventions as: - **[Action Name]**: [Estimated Impact] | [Cost]
    """
    full_prompt = f"{system_instruction}\n\nLIVE TELEMETRY DATA:\n{context}\n\nUSER QUERY:\n{query}"

    try:
        response = model.generate_content(full_prompt)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"System Error: {str(e)}"}