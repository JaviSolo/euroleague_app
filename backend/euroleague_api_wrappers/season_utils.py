from datetime import datetime
from euroleague_api.EuroLeagueData import EuroLeagueData

def get_current_season_code() -> int:
    """
    Devuelve el año de inicio de la temporada actual.
    Por ejemplo: septiembre 2024 → 2024 (para temporada 2024-2025)
    """
    today = datetime.today()
    return today.year if today.month >= 9 else today.year - 1


def get_latest_round(season: int) -> int:
    """
    Devuelve la última jornada (gameday) con partidos jugados de la temporada.

    Args:
        season (int): Año de inicio de temporada (ej. 2024 para 2024-2025)

    Returns:
        int: Número de la última ronda/jornada
    """
    try:
        euro = EuroLeagueData(competition="E")
        df = euro.get_game_metadata_season(season)
        df_played = df[df["played"] == True]

        if not df_played.empty and "gameday" in df_played.columns:
            return int(df_played["gameday"].max())

    except Exception as e:
        print(f"❌ Error obteniendo rondas de la Euroliga: {e}")

    return None

def get_season_code_from_label(season_label: str) -> str:
    """
    Convierte una etiqueta de temporada como '2024-2025' en el código 'E2024'.
    """
    try:
        start_year = season_label.split("-")[0]
        return f"E{start_year}"
    except Exception as e:
        raise ValueError(f"Invalid season format: {season_label}") from e
