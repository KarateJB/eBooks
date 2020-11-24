using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Backend.WebApi.Models;
using Backend.WebApi.Models.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

namespace Backend.WebApi.Utils.Extensions
{
    /// <summary>
    /// ControllerBase extensions
    /// </summary>
    public static class ControllerBaseExtensions
    {
        public static bool TryGetPagingUriParams(this ControllerBase controller, Microsoft.AspNetCore.Http.HttpRequest request, out PagingUriParam pagingUriParam)
        {
            const bool PAGING_PARAM_IS_READY = true;

            var pQuery = request.Query["query"];
            var pPage = request.Query["page"];
            var pLimit = request.Query["limit"];
            var pOrderBy = request.Query["orderBy"];
            var pAscending = request.Query["ascending"];

            pagingUriParam = new PagingUriParam();

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
                IList<string> errs = new List<string>();
                if (!Validator.TryValidateObject(pagingUriParam, context, validateErrs, true))
                {
                    validateErrs.ForEach(err => errs.Add($"{err.ErrorMessage}"));
                }
                pagingUriParam.ValidationErrors = errs;

                return PAGING_PARAM_IS_READY;
            }
            catch (Exception ex)
            {
                pagingUriParam.ValidationErrors.Add($"{ex.Message}");
                return !PAGING_PARAM_IS_READY;
            }
        }
    }
}
