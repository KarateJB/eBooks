using Newtonsoft.Json;

namespace MyTimerFuncs
{
    public class Message
    {
        [JsonProperty("title")]
        public string Title {get; set;}

        [JsonProperty("text")]
        public string Text { get; set; }
    }
}
