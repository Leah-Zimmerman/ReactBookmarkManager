using System.Text.Json.Serialization;

namespace ReactBookmarkManager.Data
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public string PasswordHash { get; set; }
        public List<Bookmark> Bookmarks { get; set; } = new List<Bookmark>();
    }
}