using Backend.WebApi.Utils.Factory;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.WebApi.Utils.Extensions
{
    /// <summary>
    /// ServiceCollection extensions
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add DAL repositories
        /// </summary>
        /// <param name="services">IServiceCollection</param>
        /// <param name="corsPolicyName">CORS policy name</param>
        /// <param name="allowedCrossDomains">Allowed CROS domains</param>
        public static IServiceCollection AddCustomCors(this IServiceCollection services, string corsPolicyName, string[] allowedCrossDomains)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(
                    corsPolicyName,
                    builder =>
                    builder.WithOrigins(allowedCrossDomains) // or builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .AllowAnyMethod()
                    .WithExposedHeaders(CustomHttpHeaderFactory.TotalCount));
            });

            return services;
        }
    }
}
