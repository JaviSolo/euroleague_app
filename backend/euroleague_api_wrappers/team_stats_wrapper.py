from euroleague_api.team_stats import TeamStats

def get_team_stats(team_name: str, season_label: str) -> dict:
    """
    Devuelve todas las estadísticas disponibles del equipo para una temporada concreta.
    """

    season_start_year = int(season_label.split("-")[0])

    try:
        team_api = TeamStats()
        df_stats = team_api.get_team_stats_single_season("traditional", season=season_start_year)

        print("📋 Columnas disponibles:", df_stats.columns.tolist())

        filtered = df_stats[df_stats["team.name"].str.lower() == team_name.lower()]
        if filtered.empty:
            raise Exception(f"No stats found for team: {team_name}")

        row = filtered.iloc[0]

        # Limpieza: convertir todo a tipos serializables para JSON
        def serialize(value):
            if isinstance(value, str):
                return value.strip()
            elif isinstance(value, (int, float)):
                return round(value, 2) if isinstance(value, float) else value
            return str(value)

        # Convertir toda la fila a diccionario
        return {col: serialize(row[col]) for col in df_stats.columns}

    except Exception as e:
        print(f"❌ Error in get_team_stats: {e}")
        raise
