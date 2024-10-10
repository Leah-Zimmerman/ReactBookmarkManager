using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactBookmarkManager.Data;
using ReactBookmarkManager.Web.ViewModels;

namespace ReactBookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private string _connectionString;
        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("addBookmark")]
        public void AddBookmark(Bookmark bookmark)
        {
            var repo = new UserRepository(_connectionString);
            repo.AddBookmark(bookmark);
        }
        [HttpPost]
        [Route("getBookmarksById")]
        public List<Bookmark> GetBookmarksById(UserId userId)
        {
            var repo = new UserRepository(_connectionString);
            return repo.GetBookmarksById(userId.Id);
        }
        [HttpPost]
        [Route("updateBookmark")]
        public void UpdateBookmark(UpdateViewModel uvm)
        {
            var repo = new UserRepository(_connectionString);
            repo.UpdateBookmark(uvm.BookmarkId, uvm.Title);
        }
        [HttpPost]
        [Route("deleteBookmark")]
        public void DeleteBookmark(UserId userId)
        {
            var repo = new UserRepository(_connectionString);
            repo.DeleteBookmark(userId.Id);
        }
        [HttpGet]
        [Route("getTop5BookmarksWithUserCount")]
        public List<BookmarkCount> GetTop5BookmarksWithUserCount()
        {
            var repo = new UserRepository(_connectionString);
            return repo.GetTop5BookmarksWithUserCount();
        }
    }
    public class UserId
    {
        public int Id { get; set; }
    }
}
