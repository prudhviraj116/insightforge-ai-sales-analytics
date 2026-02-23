'''import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")'''


'''import os
from pathlib import Path
from dotenv import load_dotenv

# Always load .env from backend folder (stable fix)
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = os.getenv("DB_PORT", "3306")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")'''






'''

import os
from pathlib import Path
from dotenv import load_dotenv

# Get backend folder path explicitly
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env from backend root
env_path = BASE_DIR / ".env"
load_dotenv(dotenv_path=env_path)

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = os.getenv("DB_PORT", "3306")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")'''
import os
from pathlib import Path
from dotenv import load_dotenv

# Backend root directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables
load_dotenv()

# Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Database Config
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_PORT = os.getenv("DB_PORT", "3306")
