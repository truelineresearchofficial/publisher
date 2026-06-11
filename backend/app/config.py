"""Runtime configuration, sourced from environment / .env."""
from __future__ import annotations

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # identity (for logs / sheet ownership)
    site_name: str = "publisher"
    app_env: str = "development"
    log_level: str = "INFO"

    # database
    database_url: str = "postgresql+asyncpg://trl:trl@localhost:5432/trueline_publisher"

    # google sheets
    sheets_sync_enabled: bool = True
    google_sa_json_path: str = "/run/secrets/google_sa.json"
    sheets_doc_id: str = ""
    reconciler_interval_seconds: int = 60
    sync_max_attempts: int = 8

    # anti-abuse
    rate_limit_submit: str = "10/minute"
    rate_limit_newsletter: str = "5/minute"
    max_body_bytes: int = 32_768
    trusted_proxy_ips: str = "127.0.0.1"


settings = Settings()
