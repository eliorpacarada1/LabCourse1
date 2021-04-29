using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Data.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        public ApplicationUser User { get; set; }

        public ParkingSpot Spot { get; set; }
   
        public string CarPlates { get; set; }

        public string OrderDate { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public double Price { get; set; }

        

        
    }
}
