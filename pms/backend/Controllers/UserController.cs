using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PMS.Data.Entities;
using PMS.Model;
using PMS.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PMS.Controllers
{
    [ApiController]
    [Route("User")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPut("Edit")]
        public async Task<IActionResult> EditUser(EditUserModel user)
        {           
            var currentUser = await _userManager.FindByIdAsync(user.Id);

            if (currentUser == null)
            {
                return Content("This user doesn't exist!");
            }

            if (user.Username != null) { currentUser.UserName = user.Username; }
            if (user.Email != null) {
                // checking if email exists
                var emailExists = await _userManager.FindByEmailAsync(user.Email);
                if (emailExists != null)
                {
                    return Conflict(new { message = "User already exists" });
                }
                currentUser.Email = user.Email;
            }
            if (user.FirstName != null) { currentUser.FirstName = user.FirstName; }
            if (user.LastName != null) { currentUser.LastName = user.LastName; }
            if (user.Password != null) { await _userManager.ChangePasswordAsync(currentUser,user.CurrentPassword, user.Password); }
            if (user.Birthdate != null) { currentUser.Birthdate = user.Birthdate; }
            if (user.PhoneNumber != null) { currentUser.PhoneNumber = user.PhoneNumber; }

            try
            {
                if (user.FirstName != null || user.Username != null || user.Email != null || user.LastName != null || user.Password != null || user.Birthdate != null || user.PhoneNumber != null)
                {
                    var result = await _userManager.UpdateAsync(currentUser);

                    if (result.Succeeded)
                    {
                        return Ok("User has successfully been edited");
                    }
                }
            } catch(Exception ex)
            {
                Console.WriteLine(ex);
            }

            return BadRequest(new { message = "User could not be updated." });
        }
    }
} 