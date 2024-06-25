using Microsoft.EntityFrameworkCore;
using FinalProjectV02.Server.Models.Entities;

namespace FinalProjectV02.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        // Disable lazy loading proxies
        ChangeTracker.LazyLoadingEnabled = false;
    }

    public DbSet<Company> Companies { get; set; } = null!;
    public DbSet<Message> Messages { get; set; } = null!;
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Role> Roles { get; set; } = null!;
    public DbSet<Status> Statuses { get; set; } = null!;
    public DbSet<Tache> Taches { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<UsersInProject> UsersInProjects { get; set; } = null!;
}
