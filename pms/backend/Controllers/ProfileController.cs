using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PMS.Data;
using PMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Controllers
{
    [Route("Profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [Route("User")]
        [HttpGet]
        [Authorize]
        public async Task<Object> UserProfile()
        {
            string userId = User.Claims.First(u => u.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);

            return new
            {
                user.Email,
                user.UserName
            };
        }

        [Route("EditProfile")]
        [HttpPost]
        public async Task<Object> EditUserProfile([FromBody] string Id)
        {
            var findUser = await _userManager.FindByIdAsync(Id);
            return findUser != null
                ? (new
                {
                    findUser.FirstName,
                    findUser.LastName,
                    findUser.Birthdate,
                    findUser.PhoneNumber,
                    findUser.Email,
                    findUser.UserName
                })
                : NotFound("User not found");
        }

    }
}