using System.Text.Json.Serialization;

namespace ReactBookmarkManager.Data
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }

}