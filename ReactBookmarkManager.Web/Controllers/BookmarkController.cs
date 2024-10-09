using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactBookmarkManager.Data;

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
    }
}
