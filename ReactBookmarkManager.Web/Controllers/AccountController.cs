using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactBookmarkManager.Data;
using ReactBookmarkManager.Web.ViewModels;
using System.Security.Claims;

namespace ReactBookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private string _connectionString;
        public AccountController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("signup")]
        public void Signup(SignupViewModel user)
        {
            var repo = new UserRepository(_connectionString);
            repo.AddUser(user, user.Password);
        }
        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel credentials)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.Login(credentials.Email, credentials.Password);
            if (user == null)
            {
                return null;
            }
            var claims = new List<Claim>
            {
                new Claim("user",credentials.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            return user;
        }
        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }
        [HttpGet]
        [Route("getCurrentUser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }
    }
}
