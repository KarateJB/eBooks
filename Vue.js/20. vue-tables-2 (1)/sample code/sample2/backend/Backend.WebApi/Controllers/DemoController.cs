using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Backend.WebApi.Models;
using Backend.WebApi.Models.ApiModel;
using Backend.WebApi.Models.Enum;
using Backend.WebApi.Utils.Extensions;
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
    public class DemoController : BaseController
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

            // Use Request.Query or Model Binding as declared inside Action

            // Method 1. Use BaseControllerr
            // (var isNeedPaging, var pagingUriParam) = await this.TryGetPagingUriParamsAsync();

            // Method 2. Use ControllerBaseExtensions
            var isNeedPaging = this.TryGetPagingUriParams(this.Request, out PagingUriParam pagingUriParam);

            if (pagingUriParam.ValidationErrors !=null && pagingUriParam.ValidationErrors.Count > 0)
            {
                this._logger.LogError(pagingUriParam.ValidationErrors.Aggregate(string.Empty, (x, y) => x + ";" + y));
                this.Response.StatusCode = StatusCodes.Status400BadRequest;
                return null;
            }

            IQueryable<StarWars> pagedTableData = null;
            var queryedData = this._tableDatas.AsQueryable().Where(x => x.Name.Contains(query, StringComparison.InvariantCultureIgnoreCase));

            if (isNeedPaging)
            {
                pagedTableData = queryedData.Paging(pagingUriParam.OrderBy, pagingUriParam.SortType, pagingUriParam.Page.Value, pagingUriParam.Limit.Value);
            }
            else
            {
                pagedTableData = this._tableDatas.AsQueryable().OrderBy(x => x.Name);
            }

            // Set X-Total-Count
            this.Response.Headers.Add(CustomHttpHeaderFactory.TotalCount, queryedData.Count().ToString());

            return await Task.FromResult(pagedTableData);
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
