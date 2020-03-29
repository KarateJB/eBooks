using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Backend.WebApi.Models;
using Backend.WebApi.Utils.Factory;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Backend.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class DemoController : ControllerBase
    {
        private readonly ILogger _logger;

        private readonly IEnumerable<StarWars> _tableDatas = null;

        public DemoController(ILogger<DemoController> logger)
        {
            this._logger = logger;
            this._tableDatas = this.createFakeTableDatas();
        }


        [HttpGet]
        [Route("Query")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IQueryable<StarWars>> QueryAsync(
            string query,
            int page,
            int limit,
            string orderBy,
            SortTypeEnum ascending)
        {
            if (page <= 0)
            {
                this.Response.StatusCode = StatusCodes.Status400BadRequest;
                return null;
            }

            IQueryable<StarWars> sortedTableData = null;

            if (!string.IsNullOrEmpty(orderBy))
            {
                // Convert the orderBy column from Lower-case-camel to Upper-case-camel
                orderBy = orderBy.Length > 1 ?
                    Char.ToUpperInvariant(orderBy[0]).ToString() + orderBy.Substring(1) :
                    Char.ToUpperInvariant(orderBy[0]).ToString();

                // Query and Sort 
                switch (ascending)
                {
                    case SortTypeEnum.Descending:
                        sortedTableData = this._tableDatas.AsQueryable()
                            .Where(x => x.Name.Contains(query, StringComparison.InvariantCultureIgnoreCase))
                            .OrderBy($"{orderBy} DESC");
                        break;
                    case SortTypeEnum.Ascending:
                    default:
                        sortedTableData = this._tableDatas.AsQueryable()
                            .Where(x => x.Name.Contains(query, StringComparison.InvariantCultureIgnoreCase))
                            .OrderBy(orderBy);
                        break;
                }
            }
            else
            {
                sortedTableData = this._tableDatas.AsQueryable().Where(x => x.Name.Contains(query)).OrderBy(x => x.Name);
            }

            // Set X-Total-Count
            this.Response.Headers.Add(CustomHttpHeaderFactory.TotalCount, sortedTableData.Count().ToString());

            // Get final paging data
            var pagingTableData = sortedTableData.Skip(limit * (page - 1)).Take(limit);

            return pagingTableData;
        }

        private IEnumerable<StarWars> createFakeTableDatas()
        {
            var tableDatas = new List<StarWars>
            {
                new StarWars {Id=1,Name="Luke Skywalker",Gender="male", Img="https://goo.gl/KEUxHN"},
                new StarWars {Id=2,Name="Leia Skywalker",Gender="female",Img="https://goo.gl/rNJhLU"},
                new StarWars {Id=3,Name="Anakin Skywalker",Gender="male",Img="https://goo.gl/rvcqJN"},
                new StarWars {Id=4,Name="Padme (Amidala)",Gender="female",Img="https://goo.gl/CNr4WK"},
                new StarWars {Id=5,Name="Rey",Gender="female",Img="https://goo.gl/NEfjfi"},
                new StarWars {Id=6,Name="Obi Wan Kenobi",Gender="male",Img="https://goo.gl/7c5NkR"},
                new StarWars {Id=7,Name="Mace Windu",Gender="male",Img="https://goo.gl/VZsqrH"},
                new StarWars {Id=8,Name="Yoda",Gender="male",Img="https://goo.gl/uJQRGX"},
                new StarWars {Id=9,Name="Darth Vader",Gender="male",Img="https://goo.gl/xcMHqj"},
                new StarWars {Id=10,Name="Darth Sidious",Gender="male",Img="https://goo.gl/QJiJWx"},
                new StarWars {Id=11,Name="Count Dooku",Gender="male",Img="https://goo.gl/sm76q7"},
                new StarWars {Id=12,Name="Darth Maul",Gender="male",Img="https://goo.gl/ikbM7n"}
            };
            return tableDatas.AsEnumerable();
        }
    }
}
