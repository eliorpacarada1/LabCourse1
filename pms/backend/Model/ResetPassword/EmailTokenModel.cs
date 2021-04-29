using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Model
{
    public class EmailTokenModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string ResetPasswordToken { get; set; }        
    }
}
