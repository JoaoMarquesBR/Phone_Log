using DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseDAL
{
    //internal class TheFactory_Repository
   public class TheFactory_Repository<T> : IRepository<T> where T : TheFactory_Entity
    {
        readonly private TheFactory_Context _db;
        public TheFactory_Repository()
        {
            _db = new TheFactory_Context();
        }

        public async Task<List<T>> GetAll()
        {
            return await _db.Set<T>().ToListAsync();
        }

        public async Task<T> Add(T entity)
        {
            Debug.WriteLine("\n\nGetting entity as "+ entity.ToString());
                _db.Set<T>().Add(entity);
            Debug.WriteLine("\n\nEntity was added ok!");
            try
            {
                await _db.SaveChangesAsync();
            }catch(Exception e)
            {
                Debug.WriteLine("ERROR ERROR " + e.Message);

            }
            Debug.WriteLine("\n\nEntity was SAVED OK ");
            return entity;

        }

        public async Task<T?> GetOne(Expression<Func<T, bool>> match)
        {
            return await _db.Set<T>().FirstOrDefaultAsync(match);
        }

        public async Task<int> Delete(int id)
        {
            T? currentEntity = await GetOne(ent => ent.accountID == id);
            _db.Set<T>().Remove(currentEntity!);
            return _db.SaveChanges();
        }
    }
}
