from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from urllib.parse import urlparse

import pandas as pd
import joblib

from feature_extraction import (
    extract_features,
    FEATURE_NAMES
)


# ============================================
# Create FastAPI application
# ============================================

app = FastAPI(
    title="ScamShield API",
    description="AI-powered phishing URL detection API",
    version="1.0"
)


# ============================================
# Load trained model
# ============================================

model = joblib.load(
    "scamshield_model.pkl"
)


# ============================================
# CORS
# ============================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# ============================================
# Request model
# ============================================

class URLRequest(BaseModel):

    url: str


# ============================================
# Home endpoint
# ============================================

@app.get("/")
def home():

    return {
        "message": "ScamShield backend is running"
    }


# ============================================
# URL validation
# ============================================

def validate_url(url):

    try:

        url = url.strip()

        parsed = urlparse(url)

        # Must use HTTP or HTTPS
        if parsed.scheme.lower() not in [
            "http",
            "https"
        ]:
            return False

        # Must have hostname
        if not parsed.hostname:
            return False

        return True

    except Exception:

        return False


# ============================================
# Analyze URL
# ============================================

@app.post("/analyze")
def analyze(request: URLRequest):

    # Clean input
    url = request.url.strip()


    # ----------------------------------------
    # Validate URL
    # ----------------------------------------

    if not validate_url(url):

        return {

            "url": url,

            "valid": False,

            "message": "Invalid URL"
        }


    # ----------------------------------------
    # Extract features
    # ----------------------------------------

    features = extract_features(
        url
    )


    # ----------------------------------------
    # Convert features to DataFrame
    # ----------------------------------------

    features_df = pd.DataFrame(

        [features],

        columns=FEATURE_NAMES
    )


    # ----------------------------------------
    # Prediction
    # ----------------------------------------

    prediction = int(

        model.predict(
            features_df
        )[0]
    )


    # ----------------------------------------
    # Probability
    # ----------------------------------------

    probabilities = model.predict_proba(

        features_df
    )[0]


    # Match probabilities with class labels
    class_probabilities = dict(

        zip(
            model.classes_,
            probabilities
        )
    )


    # Dataset convention:
    #
    # 0 = phishing
    # 1 = legitimate

    phishing_probability = float(

        class_probabilities.get(
            0,
            0
        )
    )


    legitimate_probability = float(

        class_probabilities.get(
            1,
            0
        )
    )


    # ----------------------------------------
    # Return response
    # ----------------------------------------

    return {

        "url": url,

        "valid": True,

        "prediction": prediction,

        "legitimate_probability":
            legitimate_probability,

        "phishing_probability":
            phishing_probability,

        "features": features,

        "message":
            "URL analyzed successfully"
    }