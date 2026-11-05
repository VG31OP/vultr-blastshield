"""Configuration management for Vultr BlastShield."""
import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

# Load .env file
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings(BaseSettings):
    # Vultr Serverless Inference
    vultr_inference_api_key: str = os.getenv("VULTR_INFERENCE_API_KEY", "")
    vultr_inference_endpoint: str = os.getenv(
        "VULTR_INFERENCE_ENDPOINT", "https://api.vultrinference.com/v1"
    )
    vultr_inference_model: str = os.getenv(
        "VULTR_INFERENCE_MODEL", "llama-3.3-70b-instruct"
    )

    # Sandbox Configuration
    sandbox_backend: str = os.getenv("SANDBOX_BACKEND", "auto")
    sandbox_timeout_seconds: float = float(
        os.getenv("SANDBOX_TIMEOUT_SECONDS", "10.0")
    )
    sandbox_memory_limit_mb: float = float(
        os.getenv("SANDBOX_MEMORY_LIMIT_MB", "256.0")
    )
    sandbox_cpu_quota: float = float(os.getenv("SANDBOX_CPU_QUOTA", "0.5"))

    # Server settings
    backend_host: str = os.getenv("BACKEND_HOST", "0.0.0.0")
    backend_port: int = int(os.getenv("BACKEND_PORT", "8000"))
    allowed_origins: str = os.getenv("ALLOWED_ORIGINS", "*")

    # Smart mock fallback when API key is not yet set
    enable_smart_fallback: bool = (
        os.getenv("ENABLE_SMART_FALLBACK", "true").lower() == "true"
    )

    # Workspace paths
    base_dir: Path = Path(__file__).resolve().parent.parent.parent
    demo_dir: Path = base_dir / "demo"
    storage_dir: Path = base_dir / "backend" / "sandbox_storage"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
# Ensure storage dir exists
settings.storage_dir.mkdir(parents=True, exist_ok=True)
