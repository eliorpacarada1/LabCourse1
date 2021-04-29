using PMS.Model;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PMS.Data.Entities;

namespace PMS.Services
{
    public class MapProfile : Profile
    {        public MapProfile()
        {
            this.CreateMap<Parking, ParkingModel>().ReverseMap();
        }
    }
}
