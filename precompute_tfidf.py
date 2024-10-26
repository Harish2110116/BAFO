import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import json
import numpy as np

# Load the CSV file
df = pd.read_csv('unique_stop_names.csv')

# Extract the stop names
stop_names = df['stop_name'].tolist()

# Initialize the TF-IDF Vectorizer
vectorizer = TfidfVectorizer()

# Fit and transform the stop names to create TF-IDF feature vectors
feature_vectors = vectorizer.fit_transform(stop_names).toarray()

# Save the vectorizer vocabulary and feature vectors to disk as JSON
with open('tfidf_vectorizer.json', 'w') as f:
    json.dump(vectorizer.vocabulary_, f)

with open('tfidf_feature_vectors.json', 'w') as f:
    json.dump(feature_vectors.tolist(), f)

with open('stop_names.json', 'w') as f:
    json.dump(stop_names, f)
