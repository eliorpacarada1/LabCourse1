using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Data.Entities
{
    public class ParkingSpot
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        public Parking Parking { get; set; }

        public bool Spot_Availiability { get; set; }

       public ICollection<Order> ParkingSpot_Orders { get; set; }

    }
}