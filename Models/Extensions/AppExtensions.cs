using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace observable_collections.Models.Extensions
{
    public static class AppExtensions
    {
        public static Task<List<Theme>> GetThemes()
        {
            return Task.Run(() =>
            {
                var model = new List<Theme>() {
                    new Theme { name = "green-light", display = "Green - Light" },
                    new Theme { name = "red-light", display = "Red - Light" },
                    new Theme { name = "blue-light", display = "Blue - Light" }
                };

                return model;
            });
        }
    }
}
