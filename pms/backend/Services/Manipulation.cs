using Microsoft.EntityFrameworkCore;
using PMS.Data;
using PMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Services
{
    public class Manipulation : IManipulation
    {
        private readonly AppDbContext _context;

        public Manipulation(AppDbContext context)
        {
            _context = context;
        }


        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Parking[]> GetAllParkingsAsync()
        {
            IQueryable<Parking> query = _context.Parkings.AsQueryable();
            return await query.ToArrayAsync();
        }

        public async Task<Parking[]> GetParkingAsync(string city)
        {
            IQueryable<Parking> query = _context.Parkings.AsQueryable();
            query = query.Where(p => p.City.Contains(city) || p.Section.Contains(city));            

            return await query.ToArrayAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        public async Task<Parking> GetOneParkingAsync(string city)
        {
            IQueryable<Parking> query = _context.Parkings.AsQueryable();
            query = query.Where(p => p.City == city);

            return await query.FirstOrDefaultAsync();
        }
        
    }
}