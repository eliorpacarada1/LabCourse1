using Microsoft.AspNetCore.Mvc;
using PMS.Data.Entities;
using PMS.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PMS.Model;
using PMS.Data;
using Microsoft.AspNetCore.Authorization;

namespace PMS.Controllers
{
    [ApiController]
    [Route("/bookParking")]
    public class ParkingReservationController : ControllerBase
    {
        //private readonly Manipulation _manipulation;
        private readonly AppDbContext _context;

        public ParkingReservationController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> ReserveParking([FromBody] OrderModel model)
        {
            var query = _context.ParkingSpots.AsQueryable();
            var freeSpots = query.Where(p => p.Parking.Id == model.ParkingId && p.Spot_Availiability == true);

            if (freeSpots.Count() > 0)
            {
                var selectedSpot = freeSpots.FirstOrDefault();

                var findUser = _context.Users.FirstOrDefault(c => c.Id == model.UserId);                

                var order1 = new Order
                {
                    User = findUser,
                    Spot = selectedSpot,
                    CarPlates = model.CarPlates,
                    StartTime = model.StartTime,
                    EndTime = model.EndTime,
                    OrderDate = model.OrderDate,
                    Price = CalculatePrice(model.StartTime, model.EndTime, model.Price)
                };

                await _context.Orders.AddAsync(order1);
                //await _context.ParkingSpots.FindAsync(selectedSpot).
                selectedSpot.Spot_Availiability = false;
                var orderResult = await _context.SaveChangesAsync();

                if (orderResult > 0)
                {
                    return Ok("You have ordered succefully the parking spot. ");
                }
            }
            return Conflict("There are no free parking spots.");
        }

        private double CalculatePrice(string StartTime, string EndTime, double PricePerHour)
        {
            var Time = (DateTime.Parse(EndTime) - DateTime.Parse(StartTime)).TotalHours;
            return Time * PricePerHour;

           
        }
    }

}