using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PMS.Data.Entities;

namespace PMS.Data
{

    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Parking> Parkings { get; set; }
        public DbSet<ParkingSpot> ParkingSpots { get; set; }

        public DbSet<Order> Orders { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


    }
}
