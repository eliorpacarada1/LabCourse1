using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PMS.Data;
using PMS.Data.Entities;
using PMS.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Controllers
{
    [ApiController]
    [Route("Reservations")]
    public class UserReservations : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserReservations(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [Route("Slots")]
        [HttpPost]
        public IActionResult ReservationSpots(SlotUserToken id)
        {
            var slots = _context.Orders.AsQueryable();
            var getSlots = slots.Where(u => u.User.Id == id.Code);

            if (getSlots.Count() > 0)
                return Ok(getSlots);
            return NotFound("No records");
        }

        //[Authorize]
        [Route("AllSlots")]
        [HttpPost]
        public IActionResult AllSpots()
        {
            var orders = _context.Orders.AsQueryable();

            var query = from o in _context.Orders
                        join s in _context.ParkingSpots on o.Spot.Id equals s.Id
                        join u in _context.Users on o.User.Id equals u.Id
                        select new
                        {
                            o.OrderId,
                            o.OrderDate,
                            o.CarPlates,
                            o.EndTime,
                            o.Price,
                            o.StartTime,
                            s.Parking.Name,
                            s.Parking.Section,
                            u.UserName
                        };


            return Ok(query);
        }

        public class SlotUserToken
        {
            public string Code { get; set; }
        }
    }
}
