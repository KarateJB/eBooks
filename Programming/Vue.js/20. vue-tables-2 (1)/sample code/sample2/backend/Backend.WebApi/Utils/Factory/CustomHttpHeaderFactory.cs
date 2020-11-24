namespace Backend.WebApi.Utils.Factory
{
    /// <summary>
    /// custom HTTP header factory
    /// </summary>
    public class CustomHttpHeaderFactory
    {
        /// <summary>
        /// X-Total-Count: total count of records
        /// </summary>
        public static string TotalCount
        {
            get { return "X-Total-Count";  }
        }
    }
}
