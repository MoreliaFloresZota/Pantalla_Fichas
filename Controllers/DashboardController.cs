using System;
using System.Web;
using System.Web.Mvc;
using PantallaDeFichaje.Data;

namespace PantallaDeFichaje.Controllers
{
    public class DashboardController : Controller
    {
        private readonly DashboardRepo _repo = new DashboardRepo();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Data()
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));

            try
            {
                var rows = _repo.GetDashboard();
                return Json(rows, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(new
                {
                    error = ex.Message
                }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}