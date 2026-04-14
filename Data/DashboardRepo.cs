using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using PantallaDeFichaje.Models;

namespace PantallaDeFichaje.Data
{
    public class DashboardRepo
    {
        private readonly string _cs;

        public DashboardRepo()
        {
            var csEntry = ConfigurationManager.ConnectionStrings["ESTADISTICA"];
            if (csEntry == null || string.IsNullOrWhiteSpace(csEntry.ConnectionString))
                throw new Exception("No existe connectionString 'ESTADISTICA' en Web.config.");

            _cs = csEntry.ConnectionString;
        }

        public List<AreaDashboardRow> GetDashboard()
        {
            var list = new List<AreaDashboardRow>();

            var sql = @"
SET NOCOUNT ON;

DECLARE @inicioDia DATETIME;
DECLARE @finDia DATETIME;

SET @inicioDia = DATEADD(DAY, DATEDIFF(DAY, 0, GETDATE()), 0);
SET @finDia    = DATEADD(DAY, 1, @inicioDia);

;WITH medico_lookup AS
(
    SELECT
        med_codigo,
        MAX(LTRIM(RTRIM(ISNULL(med_descripcion, '')))) AS doctor_nombre
    FROM dbo.tmpRepEstadistica
    WHERE med_codigo IS NOT NULL
    GROUP BY med_codigo
),
cupo AS
(
    SELECT
        t.cua_codigo,
        t.med_codigo,
        MIN(t.tur_hora_ini) AS hora_ini_real,
        MAX(t.tur_hora_fin) AS hora_fin_real,
        SUM(ISNULL(t.tur_fichas, 0)) AS fichas_total_hoy,
        SUM(ISNULL(t.tur_fichas_actual, 0)) AS fichas_tomadas_hoy
    FROM dbo.SE_TURNO t
    WHERE t.tur_fecha >= @inicioDia
      AND t.tur_fecha <  @finDia
    GROUP BY t.cua_codigo, t.med_codigo
),
calc AS
(
    SELECT
        UPPER(LTRIM(RTRIM(ISNULL(c.CUA_DESCRIPCION, 'SIN ÁREA')))) AS area,
        cu.med_codigo,
        ml.doctor_nombre AS doctor_real,
        cu.hora_ini_real,
        cu.hora_fin_real,
        ISNULL(cu.fichas_total_hoy, 0) AS fichas_total_hoy,
        CASE
            WHEN ISNULL(cu.fichas_tomadas_hoy, 0) > ISNULL(cu.fichas_total_hoy, 0)
                THEN ISNULL(cu.fichas_total_hoy, 0)
            ELSE ISNULL(cu.fichas_tomadas_hoy, 0)
        END AS fichas_tomadas,
        CASE
            WHEN ISNULL(cu.fichas_total_hoy, 0) - ISNULL(cu.fichas_tomadas_hoy, 0) < 0
                THEN 0
            ELSE ISNULL(cu.fichas_total_hoy, 0) - ISNULL(cu.fichas_tomadas_hoy, 0)
        END AS fichas_restantes
    FROM cupo cu
    LEFT JOIN dbo.SE_CUADERNO c
        ON c.cua_codigo = cu.cua_codigo
    LEFT JOIN medico_lookup ml
        ON ml.med_codigo = cu.med_codigo
),
agrupado AS
(
    SELECT
        area,
        MIN(hora_ini_real) AS hora_ini_area,
        MAX(hora_fin_real) AS hora_fin_area,
        SUM(fichas_total_hoy) AS fichas_total,
        SUM(fichas_tomadas) AS fichas_tomadas,
        SUM(fichas_restantes) AS fichas_restantes
    FROM calc
    GROUP BY area
),
doctor_activo AS
(
    SELECT
        area,
        doctor_real,
        med_codigo,
        fichas_tomadas,
        ROW_NUMBER() OVER
        (
            PARTITION BY area
            ORDER BY fichas_tomadas DESC, med_codigo ASC
        ) AS rn
    FROM calc
)
SELECT
    a.area,
    CASE
        WHEN d.doctor_real IS NOT NULL AND LTRIM(RTRIM(d.doctor_real)) <> ''
            THEN d.doctor_real
        WHEN d.med_codigo IS NOT NULL
            THEN 'MEDICO ' + CONVERT(VARCHAR(20), d.med_codigo)
        ELSE 'SIN DOCTOR'
    END AS doctor,
    CASE
        WHEN a.hora_ini_area IS NOT NULL AND a.hora_fin_area IS NOT NULL
            THEN LEFT(CONVERT(VARCHAR(8), a.hora_ini_area, 108), 5) + ' - ' +
                 LEFT(CONVERT(VARCHAR(8), a.hora_fin_area, 108), 5)
        ELSE 'SIN HORARIO'
    END AS horario,
    a.fichas_total,
    a.fichas_tomadas,
    a.fichas_restantes,
    NULL AS ultima_toma_hora,
    CASE
        WHEN a.fichas_total > 0
            THEN CAST((100.0 * a.fichas_restantes) / a.fichas_total AS DECIMAL(5,1))
        ELSE 0
    END AS pct_restante,
    CASE
        WHEN a.fichas_restantes >= 6 THEN 'VERDE'
        WHEN a.fichas_restantes >= 1 THEN 'AMARILLO'
        ELSE 'ROJO'
    END AS color,
    GETDATE() AS fecha_usada
FROM agrupado a
LEFT JOIN doctor_activo d
    ON a.area = d.area
   AND d.rn = 1
ORDER BY a.area;
";

            using (var cn = new SqlConnection(_cs))
            using (var cmd = new SqlCommand(sql, cn))
            {
                cmd.CommandType = CommandType.Text;
                cmd.CommandTimeout = 60;

                cn.Open();

                using (var rd = cmd.ExecuteReader())
                {
                    while (rd.Read())
                    {
                        list.Add(new AreaDashboardRow
                        {
                            Area = rd["area"] == DBNull.Value ? null : rd["area"].ToString(),
                            Doctor = rd["doctor"] == DBNull.Value ? null : rd["doctor"].ToString(),
                            Horario = rd["horario"] == DBNull.Value ? null : rd["horario"].ToString(),
                            FichasTotal = rd["fichas_total"] == DBNull.Value ? (int?)null : Convert.ToInt32(rd["fichas_total"]),
                            FichasTomadas = rd["fichas_tomadas"] == DBNull.Value ? (int?)null : Convert.ToInt32(rd["fichas_tomadas"]),
                            FichasRestantes = rd["fichas_restantes"] == DBNull.Value ? (int?)null : Convert.ToInt32(rd["fichas_restantes"]),
                            UltimaTomaHora = null,
                            PctRestante = rd["pct_restante"] == DBNull.Value ? (decimal?)null : Convert.ToDecimal(rd["pct_restante"]),
                            Color = rd["color"] == DBNull.Value ? "ROJO" : rd["color"].ToString(),
                            FechaUsada = rd["fecha_usada"] == DBNull.Value ? DateTime.Now : Convert.ToDateTime(rd["fecha_usada"])
                        });
                    }
                }
            }

            return list;
        }
    }
}