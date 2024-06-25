using System.Linq.Expressions;

namespace FinalProjectV02.Server.Repository.Interfaces
{
    public interface IRepository<T> where T : class
    {
        List<T> GetAll();
        T GetOne(Expression<Func<T, bool>>T);
        void Create(T entity);
        void Update(T entity);
        void Delete(int id);
    }
}
