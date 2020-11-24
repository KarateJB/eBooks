using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Backend.WebApi.Models;
using Backend.WebApi.Models.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace Backend.WebApi.Controllers
{
    public class BaseController : ControllerBase
    {
        protected async Task<Tuple<bool, PagingUriParam>> TryGetPagingUriParamsAsync()
        {
            ////NameValueCollection nvc = System.Web.HttpUtility.ParseQueryString(this.Request.QueryString);
            ////var encryptedUserId = nvc["user"] ?? String.Empty; // User Id
            const bool PAGING_PARAM_IS_READY = true;

            var pQuery = this.Request.Query["query"];
            var pPage = this.Request.Query["page"];
            var pLimit = this.Request.Query["limit"];
            var pOrderBy = this.Request.Query["orderBy"];
            var pAscending = this.Request.Query["ascending"];

            var pagingUriParam = new PagingUriParam();

            try
            {
                pagingUriParam.Query = StringValues.IsNullOrEmpty(pQuery) ? string.Empty : pQuery.ToString();
                pagingUriParam.Page = StringValues.IsNullOrEmpty(pPage) ? null : int.Parse(pPage.ToString()) as int?;
                pagingUriParam.Limit = StringValues.IsNullOrEmpty(pLimit) ? null : int.Parse(pLimit.ToString()) as int?;
                pagingUriParam.OrderBy = StringValues.IsNullOrEmpty(pOrderBy) ? string.Empty : pOrderBy.ToString();
                pagingUriParam.SortType = StringValues.IsNullOrEmpty(pAscending) ? SortTypeEnum.Ascending : (SortTypeEnum)Int32.Parse(pAscending.ToString());

                // Validate model
                var context = new ValidationContext(pagingUriParam, null, null);
                var validateErrs = new List<ValidationResult>();
                if (!Validator.TryValidateObject(pagingUriParam, context, validateErrs, true))
                {
                    validateErrs.ForEach(err => pagingUriParam.ValidationErrors.Add($"{err.ErrorMessage}"));
                }

                return await Task.FromResult(new Tuple<bool, PagingUriParam>(PAGING_PARAM_IS_READY, pagingUriParam));
            }
            catch (Exception ex)
            {
                pagingUriParam.ValidationErrors.Add($"{ex.Message}");
                return await Task.FromResult(new Tuple<bool, PagingUriParam>(!PAGING_PARAM_IS_READY, pagingUriParam));
            }
        }
    }
}
