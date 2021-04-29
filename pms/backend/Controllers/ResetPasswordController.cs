using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PMS.Data.Entities;
using PMS.Model;
using System.Threading.Tasks;
using NETCore.MailKit.Core;

namespace PMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResetPasswordController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailService _emailService;

        public ResetPasswordController(UserManager<ApplicationUser> userManager, IEmailService emailService)
        {
            _userManager = userManager;
            _emailService = emailService;
        }
                
        [HttpPost("request")]               
        public async Task<IActionResult> RequestReseting(GetEmailModel email) 
        {
            var user = await _userManager.FindByEmailAsync(email.Email);
            if(user != null)
            {
                var resetPasswordToken = await _userManager.GeneratePasswordResetTokenAsync(user);

                var resetPasswordLink = Url.Action(null, "ResetPassword", new { email = user.Email, resetPasswordToken }, "", "localhost:3000");
               
                await _emailService.SendAsync(user.Email, "Reseting Password", $"<p>To reset password click on the link below, please!</p><a href=\"{resetPasswordLink}\">Reset Password</a>", true);
                
                return Ok("A link to reset password has been sent to your email.");
             
            }           
            return Content("A user with this email doesn't exist. Check the email, please!");
        }               
        
        [HttpPost]      
        public async Task<IActionResult> ResetPassword([FromHeader] EmailTokenModel headerModel, [FromBody] ResetPasswordModel bodyModel)
        { 
            if(ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(headerModel.Email);
                if(user != null)
                {
                    var resetResult = await _userManager.ResetPasswordAsync(user, headerModel.ResetPasswordToken, bodyModel.Password);
                    if (resetResult.Succeeded)
                    {
                        return Ok("Your password has been reset successfuly! You can go to login now.");
                    }
                    return BadRequest(resetResult.Errors);
                }
                return BadRequest(NotFound("A user with this email doesn't exist!"));
            }
            return BadRequest(ModelState);
        }
        }
}
