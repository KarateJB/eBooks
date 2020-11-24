namespace Backend.WebApi.Models.Config
{
    /// <summary>
    /// Global options
    /// </summary>
    public class GlobalOptions
    {
        /// <summary>
        /// CORS Policy name
        /// </summary>
        public string CorsPolicyName { get; set; }

        /// <summary>
        /// Allowed Cross domains
        /// </summary>
        public string[] AllowedCrossDomains { get; set; }
    }
}
