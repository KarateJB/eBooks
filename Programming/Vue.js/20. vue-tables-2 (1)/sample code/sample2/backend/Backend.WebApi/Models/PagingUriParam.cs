using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Backend.WebApi.Models.Enum;

namespace Backend.WebApi.Models
{
    public class PagingUriParam
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int? Page { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int? Limit { get; set; }

        public string OrderBy { get; set; }

        public SortTypeEnum SortType { get; set; } = SortTypeEnum.Ascending;

        public string Query { get; set; }

        public IList<string> ValidationErrors { get; set; } = new List<string>();
    }
}
