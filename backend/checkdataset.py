import pandas as pd

from feature_extraction import (
    extract_features,
    FEATURE_NAMES
)


# ============================================
# Load dataset
# ============================================

df = pd.read_csv(
    "PhiUSIIL_Phishing_URL_Dataset.csv"
)


# ============================================
# Compare our extractor with dataset values
# ============================================

for index, row in df.head(20).iterrows():

    url = row["URL"]

    our_features = extract_features(url)

    print("\n========================================")
    print("URL:", url)
    print("========================================")

    differences_found = False

    for feature in FEATURE_NAMES:

        dataset_value = row[feature]
        our_value = our_features[feature]

        if dataset_value != our_value:

            differences_found = True

            print(
                f"{feature}: "
                f"Dataset = {dataset_value}, "
                f"Our = {our_value}"
            )

    if not differences_found:
        print("All features match.")