def predict_weekly_premium(avg_daily_earning: float, zone_risk_score: float, active_alerts: int) -> float:
    base = 12 if avg_daily_earning <= 450 else 22 if avg_daily_earning <= 700 else 38
    risk_multiplier = 1 + (zone_risk_score - 0.5) * 0.8
    alert_boost = 1 + min(active_alerts, 3) * 0.05
    return round(base * risk_multiplier * alert_boost, 2)
