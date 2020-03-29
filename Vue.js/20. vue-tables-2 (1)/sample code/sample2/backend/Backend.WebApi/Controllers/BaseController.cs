using System;
using System.Threading.Tasks;
using Backend.WebApi.Models;
using Backend.WebApi.Models.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace Backend.WebApi.Controllers
{
    public class BaseController : ControllerBase
    {
        [HttpGet]
        [Route("Query")]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        protected async Task<PagingUriParam> GetPagingUriParamsAsync()
        {
            ////NameValueCollection nvc = System.Web.HttpUtility.ParseQueryString(this.Request.QueryString);
            ////var encryptedUserId = nvc["user"] ?? String.Empty; // User Id

            var pQuery = this.Request.Query["query"];
            var pPage = this.Request.Query["page"];
            var pLimit = this.Request.Query["limit"];
            var pOrderBy = this.Request.Query["orderBy"];
            var pAscending = this.Request.Query["ascending"];

            var pagingUriParam = new PagingUriParam
            {
                Query = StringValues.IsNullOrEmpty(pQuery) ? string.Empty : pQuery.ToString(),
                Page = StringValues.IsNullOrEmpty(pPage) ? 0 : Int32.Parse(pPage.ToString()),
                Limit = StringValues.IsNullOrEmpty(pLimit) ? 0 : Int32.Parse(pLimit.ToString()),
                OrderBy = StringValues.IsNullOrEmpty(pOrderBy) ? string.Empty : pOrderBy.ToString(),
                SortType = StringValues.IsNullOrEmpty(pAscending) ? SortTypeEnum.Ascending : (SortTypeEnum)Int32.Parse(pAscending.ToString()),
            };

            return await Task.FromResult(pagingUriParam);
        }
    }
}
