using Newtonsoft.Json;

namespace ProgKnow.Authorization
{
    public class Role
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
