using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Model
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Email is required. ")]
        [StringLength(50, MinimumLength = 8, ErrorMessage ="Email should have minimum 8 characters. ")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Email should be like test@test.com   ")]
        
        public string Email { get; set; }

        [Required(ErrorMessage ="Password is required. ")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Password should have minimum 8 characters.")]
        public string Password { get; set; }
    }
}
