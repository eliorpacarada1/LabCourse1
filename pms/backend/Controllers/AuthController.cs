using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NETCore.MailKit.Core;
using PMS.Data;
using PMS.Data.Entities;
using PMS.Model;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;
using PMS.Model.Enums;

namespace PMS.Controllers
{
    [ApiController]
    [Route("Account")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailService _emailService;
        private readonly ApplicationSettings _options;

        public AuthController(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> options,
            IEmailService emailService)
        {
            _userManager = userManager;
            _options = options.Value;
            _emailService = emailService;
        }


        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] User register)
        {
            var userExists = await _userManager.FindByEmailAsync(register.Email);

            if (userExists != null)
                return Conflict(new { message = "Email already exists." });

            var newUser = new ApplicationUser
            {
                UserName = register.Username,
                Email = register.Email,
                Birthdate = register.Birthdate,
                FirstName = register.FirstName,
                LastName = register.LastName,
                PhoneNumber = register.PhoneNumber
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, register.Password);
                if (result.Succeeded)
                {
                    _userManager.AddToRoleAsync(newUser, Roles.User.ToString()).Wait();

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

                    var link = Url.Action(nameof(VerifyEmail), "Auth", new { email = newUser.Email, code }, Request.Scheme, Request.Host.ToString());

                    await _emailService.SendAsync(newUser.Email, "Email Verification", $"<a href=\"{link}\">Verify Email</a><br/>Or copy here: {link}", true);

                    return Ok(new { message = "You have been registered successfully. Check your email for email verification, please!" });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return BadRequest(new { message = "User already exists" });
        }


        public async Task<IActionResult> VerifyEmail(string email, string code)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return BadRequest();           

            var result = await _userManager.ConfirmEmailAsync(user, code);

            if (result.Succeeded)
            {
                return Ok("Your email is verified successfully, now you can login!");
            }
            return BadRequest();
        }            

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                var role = await _userManager.GetRolesAsync(user);

                if (await _userManager.IsEmailConfirmedAsync(user))
                {
                    var token = Token(user, role[0]);

                    return Ok(new { token, user.UserName, user.Id, Role = role[0] });
                }
                return BadRequest(new { message = "Email is not verified"});
            }
            else
            {
                return BadRequest(new { message = "Username or password incorrect" });
            }
        }

        private string Token(ApplicationUser user, string role)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserID", user.Id),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(_options.Expiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Secret)), SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);
            return token;
        }
        
        [Route("Google")]
        [HttpPost]
        public async Task<ActionResult<string>> GoogleLogin([FromBody] string code)
        {
            var googleUser = await GoogleJsonWebSignature.ValidateAsync(code,
                new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new[] { _options.GoogleClient }
                });

            var res = new UserLoginInfo("google", googleUser.Subject, "Google");

            var userExists = await _userManager.FindByEmailAsync(googleUser.Email);

            if (userExists != null)
            {

                var role = await _userManager.GetRolesAsync(userExists);
                var token = Token(userExists, role[0]);
                return Ok(new { token });
            }

            var user = new ApplicationUser
            {
                Birthdate = "10-10-1970", Email = googleUser.Email, UserName = googleUser.GivenName, EmailConfirmed = true, FirstName = googleUser.Name, LastName = googleUser.FamilyName
            };

            var newUser = await _userManager.CreateAsync(user);
            if (!newUser.Succeeded) return BadRequest("error");
            {
                _userManager.AddToRoleAsync(user, Roles.User.ToString()).Wait();
                var test = await _userManager.AddLoginAsync(user, res);
                if (!test.Succeeded) return BadRequest("error");
                var token = Token(user, "User");
                return Ok(new {token});
            }
        }
    }
}
