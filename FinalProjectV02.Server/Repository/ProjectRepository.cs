using FinalProjectV02.Server.Data;
using FinalProjectV02.Server.Models.Entities;
using FinalProjectV02.Server.Repository.Interfaces;

namespace FinalProjectV02.Server.Repository
{
    public class ProjectRepository:  Repository<Project>, IProjectRepository
    {        public ProjectRepository(AppDbContext appDbContext) :base(appDbContext) { }
    }
}
