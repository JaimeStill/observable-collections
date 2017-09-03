using observable_collections.Models;
using observable_collections.Models.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace observable_collections.Controllers
{
    [Route("api/[controller]")]
    public class AppController : Controller
    {
        public AppController() {
            
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<Theme>> GetThemes()
        {
            return await AppExtensions.GetThemes();
        }
    }
}
