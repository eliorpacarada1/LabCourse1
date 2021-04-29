using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using PMS.Data.Entities;
using PMS.Model;
using PMS.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Controllers
{
    [Route("api")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private readonly LinkGenerator _generator;
        private readonly IManipulation _manipulation;
        private readonly IMapper _mapper;
        // private readonly ILogger _logger;

        public ParkingController(IMapper mapper, IManipulation manipulation, LinkGenerator generator)
        {
            _mapper = mapper;
            _manipulation = manipulation;
            _generator = generator;
        }

        /*[HttpGet]
        public async Task<ActionResult<Parking>> Temporary(string location)
        {
            return Ok();
        }*/

        [HttpGet]
        public async Task<ActionResult<Parking[]>> Get(string city)
        {
            var cmp = await _manipulation.GetParkingAsync(city);
            if (cmp == null) return NotFound();
            return cmp;
        }

        [HttpPost]
        [Route("post")]
        public async Task<ActionResult<ParkingModel>> Post(Parking model)
        {
            try
            {
                var existing = await _manipulation.GetOneParkingAsync(model.Name);
                if (existing != null)
                {
                    return BadRequest("Parking exists");
                }

                var location = _generator.GetPathByAction("Get",
                    "Parking",
                    new { name = model.Name });               

                if (string.IsNullOrWhiteSpace(location))
                {
                    return BadRequest("Could not use current moniker");
                }
                // Create a new Camp
                _manipulation.Add(model);
                if (await _manipulation.SaveChangesAsync())
                {
                    return Created($"/api/camps/{model.Name}", _mapper.Map<ParkingModel>(model));
                }

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Database Failure" + ex.Message);
            }

            return BadRequest();
        }      

    }
}