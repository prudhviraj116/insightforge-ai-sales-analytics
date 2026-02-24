import os
import json

try:
    from google import genai
except ImportError:
    genai = None

api_key = os.getenv("GEMINI_API_KEY")

client = None

if api_key and genai:
    try:
        client = genai.Client(api_key=api_key)
    except Exception as e:
        print(f"Gemini initialization failed: {e}")
else:
    print("Gemini API not configured. AI features disabled.")


# -----------------------------
# Safe AI Wrapper
# -----------------------------
def _safe_generate(model_name, prompt):
    if not client:
        return "AI service not available in this deployment."

    try:
        response = client.models.generate_content(
            model=model_name,
            contents=prompt
        )
        return response.text
    except Exception as e:
        print(f"Gemini runtime error: {e}")
        return "AI service error."


# -----------------------------
# Generate Insights
# -----------------------------
def generate_insight(kpis):
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

    return _safe_generate("gemini-2.5-flash", prompt)


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

    return _safe_generate("gemini-2.0-flash", prompt).strip().lower()


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

    result = _safe_generate("gemini-2.0-flash", prompt)

    try:
        return json.loads(result)
    except:
        return {}


# -----------------------------
# Explain Results
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

    return _safe_generate("gemini-2.0-flash", prompt)