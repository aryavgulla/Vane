import csv
import random
from datetime import datetime, timedelta

buildings = ['Block A (Admin)', 'Block B (Library)', 'Block C (Engineering)', 'Hostel Zone']
start_date = datetime.now() - timedelta(days=30)

with open('campus_energy_log.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['timestamp', 'building_id', 'sensor_type', 'value'])
    
    for day in range(30):
        for hour in range(24):
            current_time = start_date + timedelta(days=day, hours=hour)
            
            for building in buildings:
                base_kwh = random.gauss(50, 5)
                
                # Active campus hours (8 AM - 6 PM)
                if 8 <= hour <= 18:
                    base_kwh *= 2.5
                    
                # INJECT ANOMALY: Block C HVAC malfunction last 3 days (6 PM - 10 PM)
                if building == 'Block C (Engineering)' and day >= 27 and 18 <= hour <= 22:
                    base_kwh *= 3.8 
                    
                writer.writerow([
                    current_time.strftime('%Y-%m-%d %H:00:00'), 
                    building, 
                    'electricity_kwh', 
                    round(base_kwh, 2)
                ])

print("Successfully generated campus_energy_log.csv with ~2,800 rows.")