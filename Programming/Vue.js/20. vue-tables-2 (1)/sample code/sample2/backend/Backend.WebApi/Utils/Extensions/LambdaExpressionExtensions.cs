using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Backend.WebApi.Models.Enum;

namespace Backend.WebApi.Utils.Extensions
{
    /// <summary>
    /// Lamdba expression extensions
    /// </summary>
    public static class LambdaExpressionExtensions
    {
        /// <summary>
        /// Paging extension method
        /// </summary>
        /// <typeparam name="T">Generice type</typeparam>
        /// <param name="data">IQueryable collection</param>
        /// <param name="orderBy">The column name to sort</param>
        /// <param name="sortType">Ascending or Descending</param>
        /// <param name="page">Page</param>
        /// <param name="limit">Limit(Page size)</param>
        /// <returns>Paged IQueryable collection</returns>
        public static IQueryable<T> Paging<T>(this IQueryable<T> data, string orderBy, SortTypeEnum sortType, int page, int limit)
        {
            IQueryable<T> pagingData = null;

            // Convert orderBy column name from Lowercase-camel to Uppercase-camel
            orderBy = orderBy.ToFirstCharUpper();

            // Sort and take paged data
            switch (sortType)
            {
                case SortTypeEnum.Descending:
                    pagingData = data.OrderBy($"{orderBy} DESC").Skip(limit * (page - 1)).Take(limit);
                    break;
                case SortTypeEnum.Ascending:
                default:
                    pagingData = data.OrderBy(orderBy).Skip(limit * (page - 1)).Take(limit);
                    break;
            }

            return pagingData;
        }
    }
}
