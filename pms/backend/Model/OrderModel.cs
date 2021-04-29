using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Model
{
    public class OrderModel
    {
        [Required]  
        public string UserId { get; set; }

        [Required]
        public int ParkingId { get; set; }

        [Required]
        public string CarPlates { get; set; }

        [Required]
        public string OrderDate { get; set; }

        [Required]
        public string StartTime { get; set; }

        [Required]
        public string EndTime { get; set; }

        [Required]
        public double Price { get; set; }


    }
}
