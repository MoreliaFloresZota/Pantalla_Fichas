using System;

namespace PantallaDeFichaje.Models
{
    public class AreaDashboardRow
    {
        public string Area { get; set; }
        public string Doctor { get; set; }
        public string Horario { get; set; }

        public int? FichasTotal { get; set; }
        public int? FichasTomadas { get; set; }
        public int? FichasRestantes { get; set; }

        public TimeSpan? UltimaTomaHora { get; set; }
        public decimal? PctRestante { get; set; }

        public string Color { get; set; }
        public DateTime FechaUsada { get; set; }
    }
}