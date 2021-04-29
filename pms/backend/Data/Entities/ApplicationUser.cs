using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string Birthdate { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string FirstName{ get; set; }

        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string LastName { get; set; }

       public ICollection<Order> User_Orders { get; set; }


    }
}
