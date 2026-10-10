import pandas as pd
import numpy as np
from datetime import datetime, timedelta


def generate_csv(filename, anomaly_building=None, anomaly_multiplier=1.0):
    # Generate 10 days of hourly timestamps
    end_date = datetime(2026, 10, 10, 23, 0)
    start_date = end_date - timedelta(days=10)
    timestamps = pd.date_range(start=start_date, end=end_date, freq='h')

    buildings = ['Block A', 'Block B', 'Block C']
    base_loads = {'Block A': 120, 'Block B': 180, 'Block C': 150}

    data = []

    for ts in timestamps:
        # Determine if we are in the "last 3 days" anomaly window
        is_recent = ts >= (end_date - timedelta(days=3))
        # Determine if it's evening hours (6 PM - 10 PM) for the narrative
        is_evening = 18 <= ts.hour <= 22

        for b in buildings:
            # Base value with normal random fluctuation (±10%)
            val = base_loads[b] * np.random.uniform(0.9, 1.1)

            # Inject anomaly if applicable
            if b == anomaly_building and is_recent and is_evening:
                val *= anomaly_multiplier

            data.append({
                'timestamp': ts.strftime('%Y-%m-%d %H:%M:%S'),
                'building_id': b,
                'value': round(val, 2)
            })

    df = pd.DataFrame(data)
    df.to_csv(filename, index=False)
    print(f"Generated {filename} ({len(df)} rows)")


# We increased the multiplier to 1.85 (85% spike during the evening).
# This mathematically forces the 24-hour average to rise by ~18%, triggering the CRITICAL UI!
generate_csv('telemetry_demo_block_c_spike.csv', anomaly_building='Block C', anomaly_multiplier=1.85)

# Backup demo for Block A
generate_csv('telemetry_demo_block_a_spike.csv', anomaly_building='Block A', anomaly_multiplier=1.75)

# Nominal baseline (remains normal)
generate_csv('telemetry_demo_nominal.csv')