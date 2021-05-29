using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace MyTimerFuncs
{
    public static class MyTimerFunc
    {
        private const string CRON_SCHEDULE = "0 */2 * * * *";

        [FunctionName("MyTimerFunc")]
        public static async Task RunAsync([TimerTrigger(CRON_SCHEDULE)]TimerInfo myTimer, ILogger log)
        {
            // Get webhook url
            var webhookUrl = new Uri(Environment.GetEnvironmentVariable("TeamsWebhook"));

            log.LogInformation($"Function starts at: {DateTime.Now}");

            using(var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                var msg = new Message { Title = "Star Wars",  Text = "The force is with you." };

                log.LogInformation($"Webhook = {webhookUrl.ToString()}");

                var content = new StringContent(JsonConvert.SerializeObject(msg));
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                var response = await httpClient.PostAsync(webhookUrl, content);

                log.LogInformation($"Function ends at: {DateTime.Now}, response's status code: {(int)response.StatusCode}");
            }
        }
}
