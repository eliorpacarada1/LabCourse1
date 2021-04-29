using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Data.Entities
{
    public class Parking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public string Image { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public string Section { get; set; }

        [Required]
        public string Name { get; set; }

        public bool Valet { get; set; }

        [Required]
        public double Price { get; set; }

        public int Free_Spots { get; set; }

        public ICollection<ParkingSpot> ParkingSpots { get; set; }
    }
}
