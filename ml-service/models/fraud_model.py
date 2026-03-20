def infer_fraud_score(income_lost: float, payout_amount: float, prior_claims: int) -> float:
    score = 0.1

    if payout_amount > income_lost * 1.5:
        score += 0.4

    if prior_claims > 4:
        score += 0.25

    if income_lost < 200:
        score += 0.2

    return round(min(score, 0.95), 2)
