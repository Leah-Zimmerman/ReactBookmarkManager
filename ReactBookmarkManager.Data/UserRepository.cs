using Microsoft.EntityFrameworkCore;

namespace ReactBookmarkManager.Data
{
    public class UserRepository
    {
        private string _connectionString;
        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddUser(User user, string password)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = passwordHash;
            using var context = new UserDbContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }
        public User Login(string email,string password)
        {
            var user = GetByEmail(email);
            if(user == null)
            {
                return null;
            }
            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }
            return user;
        }
        public User GetByEmail(string email)
        {
            using var context = new UserDbContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }
        public void AddBookmark(Bookmark bookmark)
        {
            using var context = new UserDbContext(_connectionString);
            var user = context.Users.Include(u => u.Bookmarks).FirstOrDefault(u=>u.Id==bookmark.UserId);
            if (user != null)
            {
                user.Bookmarks.Add(bookmark);
                context.SaveChanges();
            }           
        }
        public List<Bookmark> GetBookmarksById(int id)
        {
            using var context = new UserDbContext(_connectionString);
            return  context.Users.Include(u => u.Bookmarks).FirstOrDefault(u=>u.Id==id).Bookmarks.ToList();
            //return user.Bookmarks.ToList();
        }
        public void UpdateBookmark(int bookmarkId,string title)
        {
            using var context = new UserDbContext(_connectionString);
            var bkmk = context.Bookmarks.FirstOrDefault(b => b.Id == bookmarkId);
            if(bkmk!=null)
            {
                bkmk.Title = title;
                context.SaveChanges();
            }
        }
        public void DeleteBookmark(int id)
        {
            using var context = new UserDbContext(_connectionString);
            var bkmk = context.Bookmarks.FirstOrDefault(b => b.Id == id);
            if(bkmk!=null)
            {
                context.Bookmarks.Remove(bkmk);
                context.SaveChanges();
            }
        }
        public List<BookmarkCount> GetTop5BookmarksWithUserCount()
        {
            using var context = new UserDbContext(_connectionString);

            var result = context.Bookmarks
                .GroupBy(b => b.Url)
                .Select(g => new BookmarkCount
                {
                    Url = g.Key,
                    UserCount = g.Select(b => b.UserId).Distinct().Count()
                })
                .OrderByDescending(b=>b.UserCount)
                .Take(5)
                .ToList();

            return result;
        }
    }
}