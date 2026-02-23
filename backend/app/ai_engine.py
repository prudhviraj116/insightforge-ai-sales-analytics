import os
from google import genai
import json

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY not set")

client = genai.Client(api_key=api_key)

def generate_insight(kpis):
    """
    Generates business insights from sales KPIs using Gemini AI.
    """
    prompt = f"""
    You are a senior business analyst.

    Analyze the following sales KPIs and provide:
    - Key observations
    - Risks
    - Opportunities
    - Strategic recommendations

    KPIs:
    {kpis}
    """

    # Call Gemini AI
    response = client.models.generate_content(
        model="gemini-2.5-flash",  # <- stable model supporting generateContent
        contents=prompt
    )

    return response.text



# -----------------------------
# Detect Intent
# -----------------------------
def detect_intent(question: str):

    prompt = f"""
    Classify the user input into one of these categories:

    - greeting
    - data_query
    - unrelated

    Return ONLY one word.

    User input: {question}
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    return response.text.strip().lower()


# -----------------------------
# Extract Structured Filters
# -----------------------------
def extract_filters(question: str):

    prompt = f"""
    Convert the user question into structured JSON filters.

    Allowed fields:
    - region
    - product
    - metric (revenue or quantity)
    - group_by (region, product, month)
    - date_range (last_3_months, last_6_months, all)

    Return ONLY valid JSON.
    No explanation.
    Question: {question}
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    try:
        return json.loads(response.text)
    except:
        return {}


# -----------------------------
# Explain Computed Results
# -----------------------------
def explain_results(question: str, result_data):

    prompt = f"""
    You are a senior business data analyst.

    User Question:
    {question}

    Computed Data:
    {result_data}

    Explain clearly in professional business language.
    Do NOT invent numbers.
    """

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )

    return response.text