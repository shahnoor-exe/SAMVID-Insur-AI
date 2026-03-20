from fastapi import FastAPI
from pydantic import BaseModel

from models.fraud_model import infer_fraud_score
from models.premium_model import predict_weekly_premium

app = FastAPI(title="SAMVID ML Service", version="0.1.0")


class PremiumInput(BaseModel):
    avg_daily_earning: float
    zone_risk_score: float
    active_alerts: int


class FraudInput(BaseModel):
    income_lost: float
    payout_amount: float
    prior_claims: int


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/premium")
def premium(payload: PremiumInput) -> dict:
    weekly = predict_weekly_premium(
        avg_daily_earning=payload.avg_daily_earning,
        zone_risk_score=payload.zone_risk_score,
        active_alerts=payload.active_alerts,
    )
    return {"weekly_premium": weekly}


@app.post("/fraud")
def fraud(payload: FraudInput) -> dict:
    score = infer_fraud_score(
        income_lost=payload.income_lost,
        payout_amount=payload.payout_amount,
        prior_claims=payload.prior_claims,
    )
    return {"fraud_score": score}
