using FinalProjectV02.Server.Data;
using FinalProjectV02.Server.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinalProjectV02.Server.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
       
        private readonly DbSet<T> DbSet;
        public Repository(AppDbContext db)
        {
            
            DbSet = db.Set<T>();
        }
        public void Create(T entity)
        {
            throw new NotImplementedException();
        }
        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<T> GetAll()
        {
           return DbSet.ToList();
        }

        public T GetOne(System.Linq.Expressions.Expression<Func<T, bool>> T)
        {
            throw new NotImplementedException();
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
