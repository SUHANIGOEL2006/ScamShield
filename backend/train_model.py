import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

from feature_extraction import (
    extract_features,
    FEATURE_NAMES
)


# ============================================
# Load dataset
# ============================================

print("Loading dataset...")

df = pd.read_csv(
    "PhiUSIIL_Phishing_URL_Dataset.csv"
)

print("Dataset loaded!")
print("Total rows:", len(df))


# ============================================
# Extract features using OUR extractor
# ============================================

print("\nExtracting features from URLs...")

feature_rows = df["URL"].apply(
    extract_features
)

X = pd.DataFrame(
    list(feature_rows),
    columns=FEATURE_NAMES
)

y = df["label"]


print("Feature extraction completed!")
print("Feature shape:", X.shape)
print("Target shape:", y.shape)


# ============================================
# Display features
# ============================================

print("\nFeatures used:")

for feature in FEATURE_NAMES:
    print("-", feature)


# ============================================
# Train-test split
# ============================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.20,

    random_state=42,

    stratify=y
)


print("\nTraining data:", X_train.shape)
print("Testing data:", X_test.shape)


# ============================================
# Create Random Forest
# ============================================

print("\nCreating Random Forest...")

model = RandomForestClassifier(

    n_estimators=100,

    random_state=42,

    n_jobs=-1
)


# ============================================
# Train model
# ============================================

print("Training Random Forest...")

model.fit(
    X_train,
    y_train
)

print("Model training completed!")


# ============================================
# Predictions
# ============================================

y_pred = model.predict(
    X_test
)


# ============================================
# Accuracy
# ============================================

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\nAccuracy:", accuracy)


# ============================================
# Classification report
# ============================================

print("\nClassification Report:")

print(
    classification_report(
        y_test,
        y_pred
    )
)


# ============================================
# Confusion matrix
# ============================================

print("\nConfusion Matrix:")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)


# ============================================
# Feature importance
# ============================================

print("\nFeature Importance:")

feature_importances = sorted(

    zip(
        FEATURE_NAMES,
        model.feature_importances_
    ),

    key=lambda x: x[1],

    reverse=True
)


for feature, importance in feature_importances:

    print(
        f"{feature}: {importance:.6f}"
    )


# ============================================
# Save model
# ============================================

joblib.dump(
    model,
    "scamshield_model.pkl"
)

print("\nModel saved successfully!")

print(
    "File: scamshield_model.pkl"
)