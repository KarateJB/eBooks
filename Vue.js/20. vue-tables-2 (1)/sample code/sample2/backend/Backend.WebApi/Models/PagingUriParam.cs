using Backend.WebApi.Models.Enum;

namespace Backend.WebApi.Models
{
    public class PagingUriParam
    {
        public string Query { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
        public string OrderBy { get; set; }
        public SortTypeEnum SortType { get; set; }
    }
}
