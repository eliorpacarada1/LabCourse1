using PMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Services
{
    public interface IManipulation
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        Task<Parking[]> GetAllParkingsAsync();

        Task<Parking[]> GetParkingAsync(string city);

        Task<Parking> GetOneParkingAsync(string city);

       // Task<ParkingSpot> GetFreeSpotAsync(string id);
    }
}
