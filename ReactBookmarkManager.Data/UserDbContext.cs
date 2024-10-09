using Microsoft.EntityFrameworkCore;

namespace ReactBookmarkManager.Data
{
    public class UserDbContext:DbContext
    {
        private string _connectionString;
        public UserDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}