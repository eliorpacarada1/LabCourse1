using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Model
{
    public class EditUserModel
    {
        [Required]
        public string Id { get; set; }

        [StringLength(50, MinimumLength = 2)]
        public string FirstName { get; set; }
                
        [StringLength(50, MinimumLength = 2)]
        public string LastName { get; set; }
                
        [StringLength(50, MinimumLength = 4)]
        public string Username { get; set; }

        [DataType(DataType.Password)]
        public string CurrentPassword { get; set; }

        [StringLength(50, MinimumLength = 8)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "Password and Confirm Password must match.")]
        public string ConfirmPassword { get; set; }

        [StringLength(10)]
        public string Birthdate { get; set; }
               
        [StringLength(32, MinimumLength = 7)]
        public string PhoneNumber { get; set; }
                
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")]
        [StringLength(100, MinimumLength = 7)]
        public string Email { get; set; }   
    }
}
